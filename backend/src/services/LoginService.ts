import LoginModel from '../models/LoginModel'
import { ServiceResponse } from '../interfaces/ServiceResponse'
import { IToken } from '../interfaces/users/IToken'
import JWT from '../utils/JWT'

export default class LoginService {
	constructor(
        private loginModel = new LoginModel(),
	) {}

	async login(email: string, password: string): Promise<ServiceResponse<IToken>> {
		try {
			const userData = await this.loginModel.login(email, password)
			const token = JWT.sign({ id: userData.id })
			return { status: 'SUCCESSFUL', data: { token: token } }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}
}
