import { Request, Response, NextFunction } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'

export default class RegisterValidation {
	static verifyRegister(req: Request, res: Response, next: NextFunction): Response | void {
		const { email, password, name, address, birthday } = req.body
		if (!email || !password || !name || !address || !birthday) {
			return res.status(ServiceCodes.INVALID_DATA).json({ message: 'All fields must be filled' })
		}
		const emailRegex = /\S+@\S+\.\S+/
		if (!emailRegex.test(email) || password.length < 6) {
			return res.status(ServiceCodes.UNAUTHORIZED).json({ message: 'Invalid email or password' })
		}
		next()
	}
}