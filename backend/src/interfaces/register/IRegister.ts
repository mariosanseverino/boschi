import { IUser } from '../users/IUser'

export interface IRegisterModel {
    register(
        { email, password, name, address, birthday }: IRegisterProps): Promise<IUser>
}

export interface IRegisterProps {
    email: string,
    password: string,
    name: string,
    address: string,
    birthday: string,
}