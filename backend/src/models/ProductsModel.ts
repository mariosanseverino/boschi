/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import { Product, NewProductRequest, ProductUpdateRequest, ProductVariant } from '../interfaces/products/Product'

export default class ProductsModel {
	private productsModel = new PrismaClient()

	private sortVariants(variants: ProductVariant[]): ProductVariant[] {
		return variants
			.map(({ productId, ...variant }) => variant)
			.sort((a, b) => {
				if (a.color < b.color) return -1
				if (a.color > b.color) return 1

				const sizes = ['S', 'M', 'L', 'XL']
				return sizes.indexOf(a.size) - sizes.indexOf(b.size)
			})
	}

	async get(): Promise<Product[]> {
		const fetchAllProducts = await this.productsModel.product.findMany({ include: { variants: true } })
		if (!fetchAllProducts) {
			throw new Error('Unable to get products.')
		}

		return fetchAllProducts
	}

	async getById(reqId: number): Promise<Product> {
		const fetchProduct = await this.productsModel.product.findFirst({ where: { id: reqId }, include: { variants: true } })
		if (!fetchProduct) {
			throw new Error('Invalid product ID.')
		}

		return fetchProduct
	}

	async create(product: NewProductRequest): Promise<Product> {
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
			description: newProduct.description,
			variants: this.sortVariants(newProduct.variants)
		}
	}

	async update({ id, updates }: ProductUpdateRequest): Promise<Product> {
		if (!updates) {
			throw new Error('No properties found on request.')
		}

		const findProduct = await this.productsModel.product.findUnique({ where: { id } })

		if (!findProduct) {
			throw new Error('Product not found.')
		}

		await this.productsModel.product.update({
			where: { id },
			data: {
				name: updates.name,
				description: updates.description
			},
		})

		const updatedProduct = await this.productsModel.product.findUnique({ where: { id }, include: { variants: true } })

		return {
			id,
			name: updatedProduct!.name,
			description: updatedProduct!.description,
			variants: this.sortVariants(updatedProduct!.variants)
		}
	}

	async updateVariant(productId: number, variant: ProductVariant): Promise<ProductVariant> {
		const { color, size } = variant
		const updatedVariant = await this.productsModel.productVariant.update({
			where: {
				color_size_productId: {
					color,
					size,
					productId
				}
			},
			data: variant
		})

		return updatedVariant
	}

	async delete(productId: number): Promise<Product> {
		const deletedProduct = await this.productsModel.product.findUnique({ where: { id: productId }, include: { variants: true } })

		if (!deletedProduct) {
			throw new Error('Product not found.')
		}

		await this.productsModel.productVariant.deleteMany({ where: { product: { id: productId } } })
		await this.productsModel.product.delete({ where: { id: productId } })

		return {
			id: productId,
			name: deletedProduct.name,
			description: deletedProduct.description,
			variants: deletedProduct.variants
		}
	}
}
