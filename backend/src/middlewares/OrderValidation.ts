import { Request, Response, NextFunction } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'
import { OrderRequest, OrderStatus } from '../interfaces/orders/Order'

export default class OrderValidation {
	static validateOrder(req: Request, res: Response, next: NextFunction) {
		const { discount, shipping, subtotal, total, userId, addressId, shipmentType, productsList }: OrderRequest = req.body

		const productsTotal = productsList.reduce((acc, product) => (acc + (product.price * product.quantity)), 0)

		if (productsTotal !== subtotal) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Products total and subtotal does not match.' })
		}
	
		if (productsTotal + shipping - discount !== total) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Order total does not match with products, shipping and discount.' })
		}
		
		if (discount === undefined
			|| shipping === undefined
			|| subtotal === undefined
			|| total === undefined
			|| userId === undefined
			|| addressId === undefined
			|| shipmentType === undefined
			|| productsList === undefined) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Order is missing mandatory information.' })
		}

		if (discount < 0 || total < 0 || discount > total) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid discount or total value.' })
		}

		next()
	}

	static validateUpdate(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params

		if (!id || Number(id) <= 0) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid order ID' })
		}

		const { newOrderStatus } = req.body
		const orderStatus: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled', 'Refunded']

		if (!newOrderStatus) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Please, inform a newOrderStatus' })
		}
		if (typeof (newOrderStatus) !== 'string' || !orderStatus.includes(newOrderStatus as OrderStatus)) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid new order status' })
		}

		next()
	}

	static validateId(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params

		if (!id) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Order ID is invalid.' })
		}

		next()
	}
}
