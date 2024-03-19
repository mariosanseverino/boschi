import { PrismaClient } from '@prisma/client'
import { IOrder, IOrderRequest } from '../interfaces/orders/IOrder'
import { IUser, IUserAddress } from '../interfaces/users/IUser'

export default class OrdersModel {
	private ordersModel = new PrismaClient()

	async create({ discount, total, userId, addressId, shipmentTypeId, productsList }: IOrderRequest): Promise<IOrder> {
		await this.findProducts(productsList)
		await this.findShipmentType(shipmentTypeId)
		const user = await this.findUser(userId)

		if (!user.address) {
			throw new Error('User has no address.')
		}

		const address = this.findAddress(user.address, addressId)
          
		const newOrder = await this.ordersModel.order.create({
			data: {
				discount,
				total,
				userId,
				addressId,
				shipmentTypeId,
				orderStatusId: 'Pending',
				OrderProduct: {
					create: await Promise.all(productsList.map(async ({ productId, quantity, color, size }) => {
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
							quantity,
							productVariant: {
								connect: {
									color_size_productId: {
										color: productVariant.color,
										size: productVariant.size,
										productId: productVariant.productId
									}}
							}
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
			total,
			userId,
			address,
			shipmentTypeId,
			orderStatus: 'Pending',
			productsList: productsList.map(({ productId, color, quantity, size }) => ({
				productId,
				productVariantColor: color,
				productVariantSize: size,
				quantity
			}))
		}
	}

	async findUser(userId: IUser['id']): Promise<Partial<IUser>> {
		const user = await this.ordersModel.user.findUnique({ where: { id: userId },
			include: { address: true } })
		
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

	findAddress(userAddressList: IUserAddress[], addressId: IUserAddress['id']): IUserAddress['id'] {
		const address = userAddressList.find((address) => address.id === addressId)
		if (!address) {
			throw new Error('User address not found.')
		}
		return address.id
	}

	async findProducts(productsList: IOrderRequest['productsList']) {
		await Promise.all(
			productsList.map(async (product) => {
				const findProduct = await this.ordersModel.product.findUnique({ where: { id: product.productId }})
				if (!findProduct) {
					throw new Error('Invalid product in products list.')
				}
			})
		)
	}

	async findShipmentType(shipmentTypeId: number) {
		const shipmentType = await this.ordersModel.shipmentType.findUnique({ where: { id: shipmentTypeId }})
	
		if (!shipmentType) {
			throw new Error('Invalid shipment type ID.')
		}
	}

	async updateStock(productsList: IOrderRequest['productsList']) {
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
