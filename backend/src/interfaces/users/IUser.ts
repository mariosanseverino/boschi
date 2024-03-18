import { IOrder } from '../orders/IOrder'

export interface IUserRequest {
    id: number,
    email: string,
    password?: string,
}

export interface IUser {
    id: number,
    email: string,
    name: string,
    address: string,
    birthday: string,
    orders: IOrder[],
}
