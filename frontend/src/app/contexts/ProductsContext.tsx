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
	getProductColors: (variants: ProductVariant[]) => ProductVariant['color'][]
	getProductSizes: (variants: ProductVariant[]) => ProductVariant['size'][]
}

export const ProductsContext = createContext<ProductsContextProps>({
	isLoading: true,
	products: [],
	setProducts: () => {},
	getProduct: async (id: number) => {
		const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/products/${id}` )
		const product = await response.json()
		return product as Product
	},
	getProductColors: (variants: ProductVariant[]) => {
		const uniqueColors: ProductVariant['color'][] = []
		variants.forEach(variant => {
			if (!uniqueColors.includes(variant.color)) {
				uniqueColors.push(variant.color)
			}
		})
		return uniqueColors
	},
	getProductSizes: (variants: ProductVariant[]) => {
		const uniqueSizes: ProductVariant['size'][] = []
		variants.forEach(variant => {
			if (!uniqueSizes.includes(variant.size)) {
				uniqueSizes.push(variant.size)
			}
		})
		return uniqueSizes
	}
})

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
		const uniqueColors: ProductVariant['size'][] = []
		variants.forEach(variant => {
			if (!uniqueColors.includes(variant.size)) {
				uniqueColors.push(variant.size)
			}
		})
		return uniqueColors
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
		getProductSizes
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
