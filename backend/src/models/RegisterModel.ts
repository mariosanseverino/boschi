import { PrismaClient } from '@prisma/client'
import { NewUser } from '../interfaces/users/User'
import { UserRegisterRequest } from '../interfaces/users/User'

export default class RegisterModel {
	private registerModel = new PrismaClient()

	async register({ email, password: reqPassword, name, cep, address, birthday }: UserRegisterRequest): Promise<NewUser> {
		await this.verifyEmail(email)
		const existingAddress = await this.verifyAddress(address)

		const newUser = await this.registerModel.user.create(
			{
				data: {
					email,
					password: reqPassword,
					name,
					address: existingAddress
						? { connect: { id: existingAddress.id } }
						: { create: { location: address, cep } },
					birthday
				},
				include: { address: true }
			}
		)

		return {
			id: newUser.id,
			email: newUser.email,
			name: newUser.name,
			address: newUser.address,
			birthday: newUser.birthday
		}
	}

	async verifyAddress(address: string) {
		return await this.registerModel.userAddress.findFirst({ where: { location: address } })
	}

	async verifyEmail(email: string) {
		const verification = await this.registerModel.user.findFirst({ where: { email } })
		if (verification) {
			throw new Error('Email already in use')
		}
	}
}
