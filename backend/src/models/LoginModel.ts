/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import { LoginRequest, UserResponse } from '../interfaces/users/User'
import BCrypt from '../utils/BCrypt'

export default class LoginModel {
	private loginModel = new PrismaClient()

	async login({ email, password }: LoginRequest): Promise<UserResponse> {
		const findUser = await this.loginModel.user.findFirst({ where: { email }, include: { address: true, Order: { include: { OrderProduct: true }} } })

		if (!findUser) {
			throw new Error('Invalid email or password')
		}

		const verifyPassword = await BCrypt.compare(password, findUser.password)
		if (!verifyPassword) {
			throw new Error('Invalid email or password')
		}

		return ({
			id: findUser.id,
			email: findUser.email,
			name: findUser.name,
			address: findUser.address,
			birthday: findUser.birthday,
			orders: findUser.Order.map(({ OrderProduct, ...order }) => ({ ...order, productsList: OrderProduct }))
		})
	}
}
