'use client'
import React, {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
	useEffect
} from 'react';import { Product } from '../interfaces/products/Products'

export type ProductsPropsType = {
    allProducts: Product[],
    setAllProducts: Dispatch<SetStateAction<Product[]>>
    getProduct: (id: number) => Promise<Product>
}

export const ProductsContext = createContext<ProductsPropsType>({
	allProducts: [],
	setAllProducts: () => {},
	getProduct: async (id: number) => {
		const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/products/${id}`)
		const product = await response.json()
		return product as Product
	}
})

interface ProductsProviderProps {
    children: React.ReactNode
}

export default function ProductsProvider({ children }: ProductsProviderProps) {
	const [allProducts, setAllProducts] = useState<Product[]>([])

	async function getProduct(id: number) {
		const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/products/${ id }`)
		const product = await response.json()
		return product as Product
	}

	useEffect(() => {
		fetch(`${ process.env.NEXT_PUBLIC_API_URL }/products`)
			.then((response) => response.json())
			.then((data) => { setAllProducts(data) })
	}, [])

	const productsValue = {
		allProducts,
		setAllProducts,
		getProduct
	}

	return (
		<ProductsContext.Provider value={ productsValue }>
			{ children }
		</ProductsContext.Provider>
	)
}

export function useProductsContext() {
	return useContext(ProductsContext)
}
