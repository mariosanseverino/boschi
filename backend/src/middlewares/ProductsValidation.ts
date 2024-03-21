import { Request, Response, NextFunction } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'
import { NewProductRequest, Product, ProductUpdateRequest } from '../interfaces/products/Product'

export default class ProductsValidation {
	static verifyCreate(req: Request, res: Response, next: NextFunction): Response | void {
		const { name, description, variants }: NewProductRequest = req.body

		if (!name || !description || !variants) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'All fields must be filled' })
		}

		if (typeof name !== 'string'
			|| typeof description !== 'string'
			|| !Array.isArray(variants)
		) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid data types, please try again' })
		}

		const allowedSizes = ['S', 'M', 'L', 'XL']

		for (const variant of variants) {
			if (typeof variant.color !== 'string'
				|| typeof variant.quantity !== 'number'
				|| typeof variant.price !== 'number') {
				return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid data types, please try again' })
			}

			if (!allowedSizes.includes(variant.size)) {
				return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid size in variants. Allowed sizes are S, M, L, XL.' })
			}
		}

		next()
	}

	static verifyUpdate(req: Request, res: Response, next: NextFunction): Response | void {
		const updates: ProductUpdateRequest = req.body
		const validKeys: Array<keyof Product> = ['id', 'name', 'description', 'variants']

		const updatesDataKeys = Object.keys(updates)

		for (const key of updatesDataKeys) {
			if (!validKeys.includes(key as keyof Product)) {
				return res.status(ServiceCodes.INVALID_DATA).json({ message: `Invalid ${key} key value` })
			}
		}

		next()
	}

	static verifyProductId(req: Request, res: Response, next: NextFunction): Response | void {
		const { id } = req.params

		if (!id) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Product ID is invalid' })
		}

		next()
	}
}