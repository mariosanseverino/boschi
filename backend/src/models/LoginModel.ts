/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, User } from '@prisma/client'
import { LoginRequest } from '../interfaces/users/User'
import BCrypt from '../utils/BCrypt'

export default class LoginModel {
	private loginModel = new PrismaClient()

	async login({ email, password }: LoginRequest): Promise<User['id']> {
		const findUser = await this.loginModel.user.findFirst({ where: { email } })
		if (!findUser) {
			throw new Error('Invalid email or password')
		}

		const verifyPassword = await BCrypt.compare(password, findUser.password)
		if (!verifyPassword) {
			throw new Error('Invalid email or password')
		}

		const { id } = findUser

		return id
	}
}
