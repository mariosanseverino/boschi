import { IProduct, IProductVariant } from '../products/IProduct'
import { IUser } from '../users/IUser'

export interface IOrder {
    id?: number,
    discount: number,
    total: number,
    userId: IUser['id'],
    address: IUser['address']
    productsList: IOrderProduct[],
}

export interface IOrderRequest {
    discount: number,
    total: number,
    userId: IUser['id'],
    address: IUser['address'],
    productsList: {
        productId: number,
        quantity: number,
        color: string,
        size: string
    }[]
}

export interface IOrderProduct {
    orderId?: IOrder['id'],
    productId: IProduct['id'],
    productVariantColor: IProductVariant['color'],
    productVariantSize: IProductVariant['size'],
    quantity: number,
}
