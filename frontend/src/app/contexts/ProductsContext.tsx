'use client'
import React, {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
	useEffect
} from 'react'
import { requestData } from '../requests'
import { Product, ProductVariant } from '../interfaces/products/Product'

export type ProductsContextProps = {
	isLoading: boolean,
	products: Product[],
	setProducts: Dispatch<SetStateAction<Product[]>>,
	getProduct: (id: number) => Promise<Product>,
	getProductColors: (variants: ProductVariant[]) => ProductVariant['color'][],
	getProductSizes: (variants: ProductVariant[]) => ProductVariant['size'][],
	getColorPrice: (color: ProductVariant['color'], currentProduct: Product) => ProductVariant['price']
}

export const ProductsContext = createContext<ProductsContextProps>({} as ProductsContextProps)

interface ProductsProviderProps {
	children: React.ReactNode
}

export default function ProductsProvider({ children }: ProductsProviderProps) {
	const [products, setProducts] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState(true)

	async function getProduct(id: number) {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
		const product = await response.json()
		return product as Product
	}

	function getProductColors(variants: ProductVariant[]) {
		const uniqueColors: ProductVariant['color'][] = []
		variants.forEach(variant => {
			if (!uniqueColors.includes(variant.color)) {
				uniqueColors.push(variant.color)
			}
		})
		return uniqueColors
	}

	function getProductSizes(variants: ProductVariant[]) {
		const sizeOrder = ['XS', 'S', 'M', 'L', 'XL']
		const uniqueSizes: ProductVariant['size'][] = []
		
		variants.forEach(variant => {
			if (!uniqueSizes.includes(variant.size)) {
				uniqueSizes.push(variant.size)
			}
		})
		return uniqueSizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
	}

	function getColorPrice(color: ProductVariant['color'], currentProduct: Product): ProductVariant['price'] {
		const currentVariant = currentProduct.variants.find((variant) => color === variant.color)
		if (currentVariant) {
			return currentVariant.price
		} else {
			return 0
		}
	}

	useEffect(() => {
		requestData('/products').then(data => {
			setProducts(data)
			setIsLoading(false)
		})
	}, [])

	const productsValue = {
		isLoading,
		products,
		setProducts,
		getProduct,
		getProductColors,
		getProductSizes,
		getColorPrice
	}

	return (
		<ProductsContext.Provider value={productsValue}>
			{children}
		</ProductsContext.Provider>
	)
}

export function useProductsContext() {
	return useContext(ProductsContext)
}
