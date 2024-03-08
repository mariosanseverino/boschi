import { IUser } from '../users/IUser';

export interface ILoginModel {
  login(email: string, password: string): Promise<IUser>
}
