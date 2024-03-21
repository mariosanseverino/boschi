import LoginModel from '../models/LoginModel'
import { ServiceResponse } from '../interfaces/ServiceResponse'
import { Token } from '../interfaces/users/Token'
import JWT from '../utils/JWT'
import { LoginRequest } from '../interfaces/users/User'

export default class LoginService {
	constructor(
		private loginModel = new LoginModel(),
	) { }

	async login({ email, password }: LoginRequest): Promise<ServiceResponse<Token>> {
		try {
			const userId = await this.loginModel.login({ email, password })
			const token = JWT.sign({ id: userId })
			return { status: 'SUCCESSFUL', data: { token: token } }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}
}
