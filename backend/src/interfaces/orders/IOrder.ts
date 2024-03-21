import { IProduct, IProductVariant } from '../products/IProduct'
import { IUser, IUserAddress } from '../users/IUser'

export type ShipmentType = 'Standard' | 'Express' | 'NextDay'

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Canceled' | 'Refunded'

export interface IOrder {
    id?: number,
    discount: number,
    total: number,
    userId: IUser['id'],
    address: IUserAddress['id'],
    shipmentType: ShipmentType,
    orderStatus: OrderStatus,
    productsList: IOrderProduct[],
}

export interface IOrderRequest {
    discount: number,
    total: number,
    userId: IUser['id'],
    addressId: IUserAddress['id'],
    shipmentType: ShipmentType,
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
