export interface Product {
    id: number,
    name: string,
    description: string,
    variants: ProductVariant[]
}

export interface ProductVariant {
    productId?: number,
    price: number,
    color: string,
    size: string,
    quantity: number
}

export interface NewProductRequest extends Omit<Product, 'id'> { }

export interface ProductUpdateRequest {
    id: Product['id'],
    updates: {
        name?: Product['name'],
        description?: Product['description'],
        variants?: Product['variants']
    }
}

export interface OrderProduct {
    orderId?: number,
    productId: Product['id']
    name: Product['name'],
    color: ProductVariant['color'],
    size: ProductVariant['size'],
    quantity: number,
    price: ProductVariant['price'],
}
