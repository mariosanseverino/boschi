/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import { IUserRequest } from '../interfaces/users/IUser'
import { IRegisterModel, IRegisterProps } from '../interfaces/register/IRegister'

export default class RegisterModel implements IRegisterModel {
	private registerModel = new PrismaClient()

	async register(
		{ email,
			password: reqPassword,
			name,
			address,
			birthday
		}: IRegisterProps
	): Promise<IUserRequest> {
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
						: { create: { location: address } },
					birthday
				}
			}
		)
		const { password, ...userData } = newUser
	
		return userData as IUserRequest
	}

	async verifyAddress(address: string) {
		return await this.registerModel.userAddress.findFirst({ where: { location: address }})
	}

	async verifyEmail(email: string) {
		const verification = await this.registerModel.user.findFirst({ where: { email } })
		if (verification) {
			throw new Error('Email already in use')
		}
	}
}
