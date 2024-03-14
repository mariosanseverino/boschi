import { PrismaClient } from "@prisma/client";
import { IProduct, IProductCreateProps } from "../interfaces/products/IProduct";

export default class ProductsModel {
    private productsModel = new PrismaClient()

    async get(): Promise<IProduct[]> {
        const fetchAllProducts = await this.productsModel.product.findMany({ include: { variants: true } })
        if (!fetchAllProducts) {
            throw new Error('Unable to get products.')
        }

        return fetchAllProducts.map((product) => ({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            description: product.description,
            variants: product.variants
                .map(({ productId, ...variant }) => variant)
        }))
    }

    async getById(reqId: number): Promise<IProduct> {
        const fetchProduct = await this.productsModel.product.findFirst({ where: { id: reqId }, include: { variants: true } })
        if (!fetchProduct) {
            throw new Error('Invalid product ID.')
        }

        return {
            ...fetchProduct,
            price: Number(fetchProduct.price),
            variants: fetchProduct.variants
                .map(({ productId, ...variant }) => variant)
        }
    }

    async create(product: IProductCreateProps): Promise<IProduct> {
        const newProduct = await this.productsModel.product.create({
            data: {
                ...product,
                variants: {
                    create: product.variants
                }
            },
            include: {
                variants: true
            }
        })
        if (!newProduct) {
            throw new Error('Unable to create new product.')
        }

        return {
            id: newProduct.id,
            name: newProduct.name,
            price: Number(newProduct.price),
            description: newProduct.description,
            variants: newProduct.variants
                .map(({ productId, ...variant }) => variant)
        }
    } 
}
