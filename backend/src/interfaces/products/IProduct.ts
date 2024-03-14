export interface IProduct {
    id: number,
    name: string,
    price: number,
    description: string,
    variants: IProductVariant[]
}

export interface IProductVariant {
    id: number,
    color: string,
    size: string,
    quantity: number
}

export interface IProductCreateProps extends Omit<IProduct, 'id'> {}