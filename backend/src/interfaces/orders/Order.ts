import { Product, ProductVariant } from '../products/Product'
import { User, UserAddress } from '../users/User'

export type ShipmentType = 'Standard' | 'Express' | 'NextDay'

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Canceled' | 'Refunded'

export interface Order {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    discount: number,
    shipping: number,
    subtotal: number,
    total: number,
    userId: User['id'],
    addressId: UserAddress['id'],
    shipmentType: ShipmentType,
    orderStatus: OrderStatus,
    productsList: OrderProduct[],
}

export interface OrderRequest extends Omit<Order, 'id' | 'updatedAt' | 'orderStatus'> { }

export interface OrderUpdate {
    orderId: Order['id']
    newOrderStatus: OrderStatus
}

export interface OrderProduct {
    orderId?: Order['id'],
    name: Product['name'],
    productId: Product['id'],
    price: ProductVariant['price'],
    color: ProductVariant['color'],
    size: ProductVariant['size'],
    quantity: number,
}
