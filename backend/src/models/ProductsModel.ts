import { PrismaClient } from "@prisma/client";
import { IProduct } from "../interfaces/products/IProduct";

export default class ProductsModel {
    private productsModel = new PrismaClient()

    async get(): Promise<IProduct[]> {
        const fetchAllProducts = await this.productsModel.product.findMany({ include: { ProductVariant: true } })
        if (!fetchAllProducts) {
            throw new Error('Unable to get products.')
        }

        return fetchAllProducts.map((product) => ({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            description: product.description,
            variants: product.ProductVariant
        }))
    }
}