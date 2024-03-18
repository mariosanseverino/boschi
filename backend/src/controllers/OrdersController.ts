import { Request, Response } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'
import OrdersService from '../services/OrdersService'

export default class OrdersController {
	constructor(
        private ordersService = new OrdersService()
	) {}

	async create(req: Request, res: Response) {
		const { discount, total, userId, address, productsList } = req.body
		const serviceResponse = await this.ordersService.create({ discount, total, userId, address, productsList })
		const { status, data } = serviceResponse
		return res.status(ServiceCodes[status]).json(data)
	}
}
