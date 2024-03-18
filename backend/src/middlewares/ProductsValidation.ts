import { Request, Response, NextFunction } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'
import { IProduct } from '../interfaces/products/IProduct'

export default class ProductsValidation {
	static verifyCreate(req: Request, res: Response, next: NextFunction): Response | void {
		const { name, price, description, variants } = req.body

		if (!name || !price || !description || !variants) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'All fields must be filled' })
		}

		if (typeof name !== 'string'
			|| typeof price !== 'number'
			|| typeof description !== 'string'
			|| !Array.isArray(variants)
		) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid data types, please try again' })
		}

		const allowedSizes = ['S', 'M', 'L', 'XL']

		for (const variant of variants) {
			if (typeof variant.color !== 'string'
			|| typeof variant.quantity !== 'number') {
				return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid data types, please try again' })
			}

			if (!allowedSizes.includes(variant.size)) {
				return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid size in variants. Allowed sizes are S, M, L, XL.' })
			}
		}

		next()
	}

	static verifyUpdate(req: Request, res: Response, next: NextFunction): Response | void {		
		const updates: Partial<IProduct> = req.body
		const validKeys: Array<keyof IProduct> = ['id', 'name', 'price', 'description', 'variants']

		const updatesDataKeys = Object.keys(updates)

		for (const key of updatesDataKeys) {
			if (!validKeys.includes(key as keyof IProduct)) {
				return res.status(ServiceCodes.INVALID_DATA).json({ message: `Invalid ${key} key value` })
			}

			if (key === 'id' || key === 'price') {
				const value = updates[key as 'id' | 'price']
	
				if (value === undefined || !/^\d+$/.test(String(value))) {
					return res.status(ServiceCodes.INVALID_DATA).json({ message: `Invalid value for ${key}. Expected a numeric string.` })
				}
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