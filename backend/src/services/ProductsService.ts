import { ServiceResponse } from '../interfaces/ServiceResponse'
import { IProduct } from '../interfaces/products/IProduct';
import ProductsModel from '../models/ProductsModel';

export default class ProductsService {
    constructor(
        private productsModel = new ProductsModel()
    ) {}

    async get(): Promise<ServiceResponse<IProduct[]>> {
        try {
            const fetchAllProducts = await this.productsModel.get()
            return { status: 'SUCCESSFUL', data: fetchAllProducts }
        } catch (error) {
            const errorMessage = error as Error
            return { status: 'UNAUTHORIZED', data: { message: errorMessage.message }}
        }
    }
}