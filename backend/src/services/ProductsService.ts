import { ServiceResponse } from '../interfaces/ServiceResponse'
import { IProduct, IProductCreateProps } from '../interfaces/products/IProduct';
import ProductsModel from '../models/ProductsModel';

export default class ProductsService {
    constructor(
        private productsModel = new ProductsModel()
    ) { }

    async get(): Promise<ServiceResponse<IProduct[]>> {
        try {
            const fetchAllProducts = await this.productsModel.get()
            return { status: 'SUCCESSFUL', data: fetchAllProducts }
        } catch (error) {
            const errorMessage = error as Error
            return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
        }
    }

    async getById(id: number): Promise<ServiceResponse<IProduct>> {
        try {
            const fetchProduct = await this.productsModel.getById(id)
            return { status: 'SUCCESSFUL', data: fetchProduct }
        } catch (error) {
            const errorMessage = error as Error
            return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
        }
    }

    async create({ name, price, description, variants }: IProductCreateProps): Promise<ServiceResponse<IProduct>> {
        try {
            const newProduct = await this.productsModel.create({
                name,
                price,
                description,
                variants
            })
            return { status: 'SUCCESSFUL', data: newProduct }
        } catch (error) {
            const errorMessage = error as Error
            return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
        }
    }
}
