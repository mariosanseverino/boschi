import { PrismaClient } from '@prisma/client'
import { Order, OrderRequest, OrderUpdate, OrderStatus } from '../interfaces/orders/Order'
import { User, UserAddress } from '../interfaces/users/User'

export default class OrdersModel {
	private ordersModel = new PrismaClient()

	async create({ discount, shipping, subtotal, total, userId, address, shipmentType, productsList }: OrderRequest): Promise<Order> {
		await this.findProducts(productsList)
		const user = await this.findUser(userId)

		if (!user.address) {
			throw new Error('User has no address.')
		}

		const newOrder = await this.ordersModel.order.create({
			data: {
				discount,
				shipping,
				subtotal,
				total,
				userId,
				addressLocation: address,
				shipmentType,
				orderStatus: 'Pending',
				OrderProduct: {
					create: await Promise.all(productsList.map(async ({ productId, price, quantity, color, size }) => {
						const productVariant = await this.ordersModel.productVariant.findUnique({
							where: {
								color_size_productId: {
									color, size, productId
								}
							}
						})

						if (!productVariant) {
							throw new Error('Product variant not found.')
						}

						return {
							productVariant: {
								connect: {
									color_size_productId: {
										color: productVariant.color,
										size: productVariant.size,
										productId: productVariant.productId
									}
								}
							},
							price,
							quantity
						}
					}))
				}
			}
		})

		if (!newOrder) {
			throw new Error('Unable to create new order.')
		}

		await this.updateStock(productsList)

		return {
			id: newOrder.id,
			discount,
			shipping,
			subtotal,
			total,
			userId,
			address,
			shipmentType,
			orderStatus: newOrder.orderStatus,
			productsList
		}
	}

	async update({ orderId, newOrderStatus }: OrderUpdate): Promise<Order> {
		const fetchOrder = await this.findOrder(orderId)

		if (!fetchOrder) {
			throw new Error('Order not found.')
		}

		const updatedOrder = await this.ordersModel.order.update(
			{
				where: { id: fetchOrder?.id },
				data: { orderStatus: newOrderStatus as OrderStatus },
				include: {
					address: true,
					OrderProduct: true
				},
			})

		if (!updatedOrder) {
			throw new Error(`Unable to update order with ID ${orderId}`)
		}

		return {
			id: updatedOrder.id,
			discount: Number(updatedOrder.discount),
			shipping: Number(updatedOrder.shipping),
			subtotal: Number(updatedOrder.subtotal),
			total: Number(updatedOrder.total),
			userId: updatedOrder.userId,
			address: updatedOrder.addressLocation,
			shipmentType: updatedOrder.shipmentType,
			orderStatus: updatedOrder.orderStatus,
			productsList: updatedOrder.OrderProduct.map(({ price, ...product }) => ({ price: Number(price), ...product }))
		}
	}

	async findOrder(orderId: Order['id']) {
		const order = await this.ordersModel.order.findUnique({ where: { id: orderId } })
		return order
	}

	async findUser(userId: User['id']): Promise<Partial<User>> {
		const user = await this.ordersModel.user.findUnique({
			where: { id: userId },
			include: { address: true }
		})

		if (!user) {
			throw new Error('Invalid user ID.')
		}

		return {
			id: user.id,
			email: user.email,
			name: user.name,
			address: user.address,
		}
	}

	findAddress(userAddressList: UserAddress[], addressId: UserAddress['id']): UserAddress['id'] {
		const address = userAddressList.find((address) => address.id === addressId)
		if (!address) {
			throw new Error('User address not found.')
		}
		return address.id
	}

	async findProducts(productsList: OrderRequest['productsList']) {
		await Promise.all(
			productsList.map(async (product) => {
				const findProduct = await this.ordersModel.product.findUnique({ where: { id: product.productId } })
				if (!findProduct) {
					throw new Error('Invalid product in products list.')
				}
			})
		)
	}

	async updateStock(productsList: OrderRequest['productsList']) {
		await Promise.all(
			productsList.map(async ({ productId, quantity, color, size }) => {
				const productVariant = await this.ordersModel.productVariant.findUnique({
					where: {
						color_size_productId: {
							color, size, productId
						}
					}
				})

				if (!productVariant) {
					throw new Error('Product variant not found.')
				}

				const newProductQuantity = productVariant.quantity - quantity

				if (newProductQuantity < 0) {
					throw new Error('Not enough stock for this product variant.')
				}

				await this.ordersModel.productVariant.update({
					where: {
						color_size_productId: {
							color: productVariant.color,
							size: productVariant.size,
							productId: productVariant.productId
						}
					},
					data: {
						quantity: newProductQuantity
					}
				})
			})
		)
	}
}
