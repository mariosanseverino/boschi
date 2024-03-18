import { PrismaClient } from '@prisma/client'
import { IOrder, IOrderRequest } from '../interfaces/orders/IOrder'

export default class OrdersModel {
	private ordersModel = new PrismaClient()

	async create({ discount, total, userId, address, productsList }: IOrderRequest): Promise<IOrder> {
		await this.findUser(userId)
		await this.findProducts(productsList)
          
		const newOrder = await this.ordersModel.order.create({
			data: {
				discount,
				total,
				userId,
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
			productsList: productsList.map(({ productId, color, quantity, size }) => ({
				productId,
				productVariantColor: color,
				productVariantSize: size,
				quantity
			}))
		}
	}

	async findUser(userId: number) {
		const verifyId = await this.ordersModel.user.findUnique({ where: { id: userId } })
		if (!verifyId) {
			throw new Error('Invalid user ID.')
		}
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
