import { Request, Response } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'
import LoginService from '../services/LoginService'
import { LoginRequest } from '../interfaces/users/User'

export default class LoginController {
	constructor(
        private loginService = new LoginService(),
	) {}

	async login(req: Request, res: Response): Promise<Response> {
		const { email, password }: LoginRequest = req.body
		const serviceResponse = await this.loginService.login({ email, password })
		const { status, data: token } = serviceResponse
		return res.status(ServiceCodes[status]).json(token)
	}
}
