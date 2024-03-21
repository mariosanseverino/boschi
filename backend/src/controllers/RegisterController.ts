import { Request, Response } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse'
import RegisterService from '../services/RegisterService'
import { UserRegisterRequest } from '../interfaces/users/User'

export default class RegisterController {
	constructor(
		private registerService = new RegisterService()
	) { }

	async register(req: Request, res: Response): Promise<Response> {
		const { email, password, name, address, birthday }: UserRegisterRequest = req.body
		const serviceResponse = await this.registerService.register({ email, password, name, address, birthday })
		const { status, data: userData } = serviceResponse
		return res.status(ServiceCodes[status]).json(userData)
	}
}
