import { PrismaClient } from '@prisma/client'
import { IOrder, IOrderRequest } from '../interfaces/orders/IOrder'

export default class OrdersModel {
	private ordersModel = new PrismaClient()

	async create({ discount, total, userId, address, productsList }: IOrderRequest): Promise<IOrder> {
		const findUser = await this.ordersModel.user.findUnique({ where: { id: userId }})

		if (!findUser) {
			throw new Error('User not found.')
		}

		if (!findUser.address) {
			throw new Error('User address not found.')
		}

		if (discount < 0 || total < 0) {
			throw new Error('Invalid discount or total value.')
		}

		if (productsList.length < 1) {
			throw new Error('Invalid products list.')
		}

		await Promise.all(
			productsList.map(async (product) => {
				const findProduct = await this.ordersModel.product.findUnique({ where: { id: product.productId }})
				if (!findProduct) {
					throw new Error('Invalid product in products list.')
				}
			})
		)
          
		const newOrder = await this.ordersModel.order.create({
			data: {
				discount,
				total,
				userId: findUser.id,
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
}