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
import { Product } from '../interfaces/products/Products'

export type ProductsPropsType = {
	isLoading: boolean,
	products: Product[],
	setProducts: Dispatch<SetStateAction<Product[]>>
	getProduct: (id: number) => Promise<Product>
}

export const ProductsContext = createContext<ProductsPropsType>({
	isLoading: true,
	products: [],
	setProducts: () => { },
	getProduct: async (id: number) => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
		const product = await response.json()
		return product as Product
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
		getProduct
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
