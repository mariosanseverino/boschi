import LoginModel from '../models/LoginModel'
import { ServiceResponse } from '../interfaces/ServiceResponse'
import { Token } from '../interfaces/users/Token'
import JWT from '../utils/JWT'
import { LoginRequest, UserResponse } from '../interfaces/users/User'

interface DataLoginResponse {
	token: Token,
	user: UserResponse
}

export default class LoginService {
	constructor(
		private loginModel = new LoginModel(),
	) { }

	async login({ email, password }: LoginRequest): Promise<ServiceResponse<DataLoginResponse>> {
		try {
			const userResponse: UserResponse = await this.loginModel.login({ email, password })
			const token = JWT.sign({ id: userResponse.id })
			return { status: 'SUCCESSFUL', data: { token, user: userResponse } }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}
}
