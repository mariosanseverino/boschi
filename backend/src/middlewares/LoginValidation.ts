import { Request, Response, NextFunction } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'
import { LoginRequest } from '../interfaces/users/User'

export default class LoginValidation {
	static verifyLogin(req: Request, res: Response, next: NextFunction): Response | void {
		const { email, password }: LoginRequest = req.body
		if (!email || !password) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'All fields must be filled.' })
		}
		const emailRegex = /\S+@\S+\.\S+/
		if (!emailRegex.test(email) || password.length < 6) {
			return res.status(ServiceCodes.UNAUTHORIZED).json({ message: 'Invalid email or password.' })
		}
		next()
	}
}
