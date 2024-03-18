import { ServiceResponse } from '../interfaces/ServiceResponse'
import { IRegisterProps } from '../interfaces/register/IRegister'
import { IUserRequest } from '../interfaces/users/IUser'
import RegisterModel from '../models/RegisterModel'
import BCrypt from '../utils/BCrypt'

export default class RegisterService {
	constructor(
		private registerModel = new RegisterModel()
	) { }

	async register(
		{ email,
			password,
			name,
			address,
			birthday
		}: IRegisterProps
	): Promise<ServiceResponse<IUserRequest>> {
		try {
			const hashedPassword = await BCrypt.hash(password, 10)
			const userData = await this.registerModel.register(
				{ email, password: hashedPassword, name, address, birthday }
			)
			return { status: 'SUCCESSFUL', data: userData }
		} catch (error) {
			const errorMessage = error as Error
			return { status: 'UNAUTHORIZED', data: { message: errorMessage.message } }
		}
	}
}
