import { Order } from '../orders/Order'

export interface LoginRequest {
    email: User['email'],
    password: User['password'],
}

export interface UserAddress {
    id: number,
    location: string,
    userId: User['id']
}

export interface User {
    id: number,
    email: string,
    password: string,
    name: string,
    address: UserAddress[],
    birthday: string,
    orders: Order[],
}

export interface UserRegisterRequest {
    email: User['email'],
    password: User['password'],
    name: User['name'],
    address: UserAddress['location'],
    birthday: User['birthday'],
}

export interface NewUser extends Omit<User, 'password' | 'orders'> {}
