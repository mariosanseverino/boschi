import { IProduct, IProductVariant } from '../products/IProduct'
import { IUser, IUserAddress } from '../users/IUser'

export enum ShipmentType {
    Standard = 1,
    Express = 2,
    NextDay = 3
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Canceled' | 'Refunded'

export interface IOrder {
    id?: number,
    discount: number,
    total: number,
    userId: IUser['id'],
    address: IUserAddress['id'],
    shipmentTypeId: ShipmentType,
    orderStatus: OrderStatus,
    productsList: IOrderProduct[],
}

export interface IOrderRequest {
    discount: number,
    total: number,
    userId: IUser['id'],
    addressId: IUserAddress['id'],
    shipmentTypeId: ShipmentType,
    productsList: {
        productId: number,
        quantity: number,
        color: string,
        size: string
    }[]
}

export interface IOrderUpdate {
    orderId: IOrder['id']
    newOrderStatus: OrderStatus
}

export interface IOrderProduct {
    orderId?: IOrder['id'],
    productId: IProduct['id'],
    productVariantColor: IProductVariant['color'],
    productVariantSize: IProductVariant['size'],
    quantity: number,
}
