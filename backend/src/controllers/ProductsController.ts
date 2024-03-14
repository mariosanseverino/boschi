import { Request, Response } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse';
import ProductsService from '../services/ProductsService';

export default class ProductsController {
    constructor(
        private productsService = new ProductsService()
    ) {}

    async get(_req: Request, res: Response) {
        const serviceResponse = await this.productsService.get()
        const { status, data } = serviceResponse
        return res.status(ServiceCodes[status]).json(data)
    }
}