import { PrismaClient } from '@prisma/client'
import { IUser } from '../interfaces/users/IUser'
import { IRegisterModel } from '../interfaces/register/IRegisterModel'
import { IRegisterProps } from '../interfaces/register/IRegisterProps'

export default class RegisterModel implements IRegisterModel {
    private registerModel = new PrismaClient()

    async register(
        {   email,
            password: reqPassword,
            name,
            address,
            birthday
        }: IRegisterProps
        ): Promise<IUser> {
        const verifyEmail = await this.registerModel.user.findFirst({ where: { email } })
        if (verifyEmail) {
            throw new Error('E-mail already in use')
        }
        const newUser = await this.registerModel.user.create(
            { data: {
                email,
                password: reqPassword,
                name,
                address,
                birthday
            }}
        )
        const { password, ...userData } = newUser

        return userData as IUser
    }
}
