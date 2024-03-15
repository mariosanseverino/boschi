import JWT from '../utils/JWT'
import { Request, Response, NextFunction } from 'express'

export default class JWTValidation {
	static async verifyJWT(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const authHeader = req.headers.authorization
  
		if (!authHeader) {
			return res.status(401).json({ message: 'No token provided' })
		}
  
		const [, token] = authHeader.split(' ')
  
		try {
			JWT.validate(token)
			next()
		} catch (err) {
			return res.status(401).json({ message: 'Invalid token' })
		}
	}
}
