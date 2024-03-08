import { IUser } from '../users/IUser';
import { IRegisterProps } from './IRegisterProps';

export interface IRegisterModel {
    register(
        {   email,
            password,
            name,
            address,
            birthday
        }: IRegisterProps): Promise<IUser>
}
