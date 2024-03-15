export interface IProduct {
    id: number,
    name: string,
    price: number,
    description: string,
    variants: IProductVariant[]
}

export interface IProductVariant {
    productId?: number,
    color: string,
    size: string,
    quantity: number
}

export interface IProductCreateProps extends Omit<IProduct, 'id'> {}

export interface IProductUpdateProps {
    id: number,
    updates: Partial<IProduct>
}

export interface IProductUpdateData {
    name?: string,
    price?: number,
    description?: string,
    [key: string]: any,
}
