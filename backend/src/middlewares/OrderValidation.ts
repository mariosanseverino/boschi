import { Request, Response, NextFunction } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'
import { OrderStatus } from '../interfaces/orders/IOrder'

export default class OrderValidation {
	static validateOrder(req: Request, res: Response, next: NextFunction) {
		const { discount, total, userId, addressId, shipmentTypeId, productsList } = req.body

		if (discount === undefined
            || total === undefined
            || userId === undefined
            || addressId === undefined
            || shipmentTypeId === undefined
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
		if (typeof(newOrderStatus) !== 'string' || !orderStatus.includes(newOrderStatus as OrderStatus)) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid new order status' })
		}

		next()
	}
}
