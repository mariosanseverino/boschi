import { Request, Response, NextFunction } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'

export default class LoginValidation {
	static verifyLogin(req: Request, res: Response, next: NextFunction): Response | void {
		const { email, password } = req.body
		if (!email || !password) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'All fields must be filled' })
		}
		const emailRegex = /\S+@\S+\.\S+/
		if (!emailRegex.test(email) || password.length < 6) {
			return res.status(ServiceCodes.UNAUTHORIZED).json({ message: 'Invalid email or password' })
		}
		next()
	}
}
