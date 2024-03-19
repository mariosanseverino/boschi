import { Request, Response, NextFunction } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'

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
}
