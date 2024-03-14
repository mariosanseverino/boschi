import { PrismaClient } from '@prisma/client'
import { ILoginModel } from '../interfaces/login/ILogin'
import { IUser } from '../interfaces/users/IUser'
import BCrypt from '../utils/BCrypt'

export default class LoginModel implements ILoginModel {
    private loginModel = new PrismaClient()

    async login(email: string, reqPassword: string): Promise<IUser> {
        const findUser = await this.loginModel.user.findFirst({ where: { email } })
        if (!findUser) {
            throw new Error('Invalid email or password')
        }
        const verifyPassword = await BCrypt.compare(reqPassword, findUser.password)
        if (!verifyPassword) {
            throw new Error('Invalid email or password')
        }

        const { password, ...userData } = findUser

        return userData as IUser
    }
}
