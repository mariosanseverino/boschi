import { Request, Response } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'
import OrdersService from '../services/OrdersService'

export default class OrdersController {
	constructor(
		private ordersService = new OrdersService()
	) { }

	async create(req: Request, res: Response): Promise<Response> {
		const { createdAt, discount, shipping, subtotal, total, userId, addressId, shipmentType, productsList } = req.body
		const serviceResponse = await this.ordersService.create({ createdAt, discount, shipping, subtotal, total, userId, addressId, shipmentType, productsList })
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
	
	async get(_req: Request, res: Response): Promise<Response> {
		const serviceResponse = await this.ordersService.get()		
		const { status, data } = serviceResponse
		return res.status(ServiceCodes[status]).json(data)
	}
	
	async getById(req: Request, res: Response): Promise<Response> {
		const { id } = req.params
		const serviceResponse = await this.ordersService.getById(Number(id))
		const { status, data } = serviceResponse
		return res.status(ServiceCodes[status]).json(data)
	}
}
