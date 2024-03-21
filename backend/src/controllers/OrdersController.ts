import { Request, Response } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'
import OrdersService from '../services/OrdersService'

export default class OrdersController {
	constructor(
		private ordersService = new OrdersService()
	) { }

	async create(req: Request, res: Response): Promise<Response> {
		const { discount, shipping, subtotal, total, userId, address, shipmentType, productsList } = req.body
		const serviceResponse = await this.ordersService.create({ discount, shipping, subtotal, total, userId, address, shipmentType, productsList })
		const { status, data } = serviceResponse
		return res.status(ServiceCodes[status]).json(data)
	}

	async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params
		const { newOrderStatus } = req.body
		const serviceResponse = await this.ordersService.update({ orderId: Number(id), newOrderStatus })
		const { status, data } = serviceResponse
		return res.status(ServiceCodes[status]).json(data)
	}
}
