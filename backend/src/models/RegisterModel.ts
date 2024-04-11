import { PrismaClient } from '@prisma/client'
import { NewUser, UserAddress, UserAddressRequest } from '../interfaces/users/User'
import { UserRegisterRequest } from '../interfaces/users/User'

export default class RegisterModel {
	private registerModel = new PrismaClient()

	async register({ email, password: reqPassword, name, address, birthday }: UserRegisterRequest): Promise<NewUser> {
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
						: { create: {
							postalCode: address.postalCode,
							street: address.street,
							number: address.number,
							complement: address.complement,
							city: address.city,
							state: address.state,
							country: address.country,
						} },
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

	async verifyAddress({ postalCode, street, number, complement, city, state, country }: UserAddressRequest) {
		return await this.registerModel.userAddress.findFirst({ where: {
			postalCode,
			street,
			number,
			complement,
			city,
			state,
			country
		} })
	}

	async verifyEmail(email: string) {
		const verification = await this.registerModel.user.findFirst({ where: { email } })
		if (verification) {
			throw new Error('Email already in use')
		}
	}
}
