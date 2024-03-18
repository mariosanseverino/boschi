import { Request, Response } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'
import ProductsService from '../services/ProductsService'

export default class ProductsController {
	constructor(
        private productsService = new ProductsService()
	) {}

	async get(_req: Request, res: Response) {
		const serviceResponse = await this.productsService.get()
		const { status, data } = serviceResponse
		return res.status(ServiceCodes[status]).json(data)
	}

	async getById(req: Request, res: Response) {
		const { id } = req.params
		const serviceResponse = await this.productsService.getById(Number(id))
		const { status, data } = serviceResponse
		return res.status(ServiceCodes[status]).json(data)
	}

	async create(req: Request, res: Response) {
		const { name, price, description, variants } = req.body
		const serviceResponse = await this.productsService.create({ name, price, description, variants })
		const { status, data } = serviceResponse
		return res.status(ServiceCodes[status]).json(data)
	}

	async update(req: Request, res: Response) {
		const { id } = req.params
		const updates = req.body
		const serviceResponse = await this.productsService.update({ id: Number(id), updates })
		const { status, data } = serviceResponse
		return res.status(ServiceCodes[status]).json(data)
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params
		const serviceResponse = await this.productsService.delete({ id: Number(id) })
		const { status, data } = serviceResponse
		return res.status(ServiceCodes[status]).json(data)
	}
}