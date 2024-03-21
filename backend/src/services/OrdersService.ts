import { ServiceResponse } from '../interfaces/ServiceResponse'
import { Order, OrderRequest, OrderUpdate } from '../interfaces/orders/Order'
import OrdersModel from '../models/OrdersModel'

export default class OrdersService {
	constructor(
		private ordersModel = new OrdersModel()
	) { }

	async create({ discount, shipping, subtotal, total, userId, address, shipmentType, productsList }: OrderRequest): Promise<ServiceResponse<Order>> {
		try {
			const orderResponse = await this.ordersModel.create({ discount, shipping, subtotal, total, userId, address, shipmentType, productsList })
			return { status: 'SUCCESSFUL', data: orderResponse }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}

	async update({ orderId, newOrderStatus }: OrderUpdate): Promise<ServiceResponse<Order>> {
		try {
			const updatedOrder = await this.ordersModel.update({ orderId, newOrderStatus })
			return { status: 'SUCCESSFUL', data: updatedOrder }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}
}