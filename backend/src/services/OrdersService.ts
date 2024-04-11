import { ServiceResponse } from '../interfaces/ServiceResponse'
import { Order, OrderRequest, OrderUpdate } from '../interfaces/orders/Order'
import OrdersModel from '../models/OrdersModel'

export default class OrdersService {
	constructor(
		private ordersModel = new OrdersModel()
	) { }

	async create({ discount, shipping, subtotal, total, userId, addressId, shipmentType, productsList }: OrderRequest): Promise<ServiceResponse<Order>> {
		try {
			const orderResponse = await this.ordersModel.create({ discount, shipping, subtotal, total, userId, addressId, shipmentType, productsList })
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
	
	async get(): Promise<ServiceResponse<Order[]>> {
		try {
			const orders = await this.ordersModel.get()
			return { status: 'SUCCESSFUL', data: orders }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}

	async getById(orderId: Order['id']): Promise<ServiceResponse<Order>> {
		try {
			const order = await this.ordersModel.getById(orderId)
			return { status: 'SUCCESSFUL', data: order }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}
}