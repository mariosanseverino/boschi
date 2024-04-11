import { Order } from '../orders/Order'

export interface LoginRequest {
    email: User['email'],
    password: User['password'],
}

export interface UserAddress {
    id: number,
    userId: User['id']
    postalCode: string,
    street: string,
    number: number,
    complement: string,
    city: string,
    state: string,
    country: string,
}

export interface UserAddressRequest extends Omit<UserAddress, 'id' | 'userId'> {}

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
    address: UserAddressRequest,
    birthday: User['birthday'],
}

export interface NewUser extends Omit<User, 'password' | 'orders'> {}
