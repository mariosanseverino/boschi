import { IOrder } from '../orders/IOrder'

export interface IUserRequest {
    id: number,
    email: string,
    password?: string,
}

export interface IUserAddress {
    id: number,
    location: string,
    userId: number
}

export interface IUser {
    id: number,
    email: string,
    name: string,
    address: IUserAddress[],
    birthday: string,
    orders: IOrder[],
}
