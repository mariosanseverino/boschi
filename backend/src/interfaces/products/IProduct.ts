export interface IProduct {
    id: number,
    name: string,
    price: number,
    variants: IProductVariant[]
}

export interface IProductVariant {
    id: number,
    color: string,
    size: string,
    quantity: number
}