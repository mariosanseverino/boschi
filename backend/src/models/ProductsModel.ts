/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import { IProduct, IProductCreateProps, IProductUpdateData, IProductUpdateProps, IProductVariant } from '../interfaces/products/IProduct'

export default class ProductsModel {
	private productsModel = new PrismaClient()

	private processVariants(variants: IProductVariant[]): IProductVariant[] {
		return variants
			.map(({ productId, ...variant }) => variant)
			.sort((a, b) => {
				if (a.color < b.color) return -1
				if (a.color > b.color) return 1
    
				const sizes = ['S', 'M', 'L', 'XL']
				return sizes.indexOf(a.size) - sizes.indexOf(b.size)
			})
	}

	async get(): Promise<IProduct[]> {
		const fetchAllProducts = await this.productsModel.product.findMany({ include: { variants: true } })
		if (!fetchAllProducts) {
			throw new Error('Unable to get products.')
		}

		return fetchAllProducts.map((product) => ({
			id: product.id,
			name: product.name,
			price: Number(product.price),
			description: product.description,
			variants: this.processVariants(product.variants)
		}))
	}

	async getById(reqId: number): Promise<IProduct> {
		const fetchProduct = await this.productsModel.product.findFirst({ where: { id: reqId }, include: { variants: true } })
		if (!fetchProduct) {
			throw new Error('Invalid product ID.')
		}

		return {
			...fetchProduct,
			price: Number(fetchProduct.price),
			variants: fetchProduct.variants
				.map(({ productId, ...variant }) => variant)
		}
	}

	async create(product: IProductCreateProps): Promise<IProduct> {
		const newProduct = await this.productsModel.product.create({
			data: {
				...product,
				variants: {
					create: product.variants
				}
			},
			include: {
				variants: true
			}
		})
        
		if (!newProduct) {
			throw new Error('Unable to create new product.')
		}

		return {
			id: newProduct.id,
			name: newProduct.name,
			price: Number(newProduct.price),
			description: newProduct.description,
			variants: this.processVariants(newProduct.variants)
		}
	}
    
	async update({ id, updates }: IProductUpdateProps): Promise<IProduct> {
		if (!updates) {
			throw new Error('No properties found on request.')
		}

		const findProduct = await this.productsModel.product.findUnique({
			where: { id },
			include: { variants: true }
		})
    
		if (!findProduct) {
			throw new Error('Product not found.')
		}

		const updateData: IProductUpdateData = {}

		for (const property in updates) {
			const key = property as keyof IProductUpdateData
        
			if (key === 'price') {
				if (typeof updates[key] === 'string') {
					updateData[key] = Number(updates[key])
				}
			} else {
				if (typeof updates[key] === 'string') {
					updateData[key] = updates[key]
				}
			}
		}

		const updatedProduct = await this.productsModel.product.update({
			where: { id },
			data: updateData
		})

		return {
			id,
			name: updatedProduct.name,
			price: Number(updatedProduct.price),
			description: updatedProduct.description,
			variants: this.processVariants(findProduct.variants)
		}
	}

	async updateVariant(productId: number, variant: IProductVariant) {
		const { color, size } = variant
		const updatedVariant = await this.productsModel.productVariant.update({
			where: { color_size_productId: {
				color,
				size,
				productId
			} },
			data: variant
		})
		return updatedVariant
	}
}
