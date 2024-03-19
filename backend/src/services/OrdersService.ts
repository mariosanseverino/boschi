import { ServiceResponse } from '../interfaces/ServiceResponse'
import { IOrder, IOrderRequest } from '../interfaces/orders/IOrder'
import OrdersModel from '../models/OrdersModel'

export default class OrdersService {
	constructor(
		private ordersModel = new OrdersModel()
	) { }

	async create({ discount, total, userId, addressId, shipmentTypeId, productsList }: IOrderRequest): Promise<ServiceResponse<IOrder>> {
		try {
			const orderResponse = await this.ordersModel.create({ discount, total, userId, addressId, shipmentTypeId, productsList })
			return { status: 'SUCCESSFUL', data: orderResponse }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}
}