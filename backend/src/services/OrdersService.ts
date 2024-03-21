import { ServiceResponse } from '../interfaces/ServiceResponse'
import { IOrder, IOrderRequest, IOrderUpdate } from '../interfaces/orders/IOrder'
import OrdersModel from '../models/OrdersModel'

export default class OrdersService {
	constructor(
		private ordersModel = new OrdersModel()
	) { }

	async create({ discount, total, userId, addressId, shipmentType: shipmentTypeId, productsList }: IOrderRequest): Promise<ServiceResponse<IOrder>> {
		try {
			const orderResponse = await this.ordersModel.create({ discount, total, userId, addressId, shipmentType: shipmentTypeId, productsList })
			return { status: 'SUCCESSFUL', data: orderResponse }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}

	async update({ orderId, newOrderStatus }: IOrderUpdate): Promise<ServiceResponse<IOrder>> {
		try {
			const updatedOrder = await this.ordersModel.update({ orderId, newOrderStatus })
			return { status: 'SUCCESSFUL', data: updatedOrder }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}
}