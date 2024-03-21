import { ServiceResponse } from '../interfaces/ServiceResponse'
import { Product, NewProductRequest, ProductUpdateRequest } from '../interfaces/products/Product'
import ProductsModel from '../models/ProductsModel'

export default class ProductsService {
	constructor(
		private productsModel = new ProductsModel()
	) { }

	async get(): Promise<ServiceResponse<Product[]>> {
		try {
			const fetchAllProducts = await this.productsModel.get()
			return { status: 'SUCCESSFUL', data: fetchAllProducts }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}

	async getById(id: number): Promise<ServiceResponse<Product>> {
		try {
			const fetchProduct = await this.productsModel.getById(id)
			return { status: 'SUCCESSFUL', data: fetchProduct }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}

	async create({ name, description, variants }: NewProductRequest): Promise<ServiceResponse<Product>> {
		try {
			const newProduct = await this.productsModel.create({
				name,
				description,
				variants
			})
			return { status: 'SUCCESSFUL', data: newProduct }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}

	async update({ id, updates }: ProductUpdateRequest): Promise<ServiceResponse<Product>> {
		try {
			if (updates && updates.variants) {
				const updateVariantsPromises = updates.variants.map((variant) => {
					return this.productsModel.updateVariant(id, variant)
				})
				await Promise.all(updateVariantsPromises)
			}
			const updatedProduct = await this.productsModel.update({ id, updates })
			return { status: 'SUCCESSFUL', data: updatedProduct }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}

	async delete({ id }: Pick<Product, 'id'>): Promise<ServiceResponse<Product>> {
		try {
			const deletedProduct = await this.productsModel.delete(id)
			return { status: 'SUCCESSFUL', data: deletedProduct }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}
}
