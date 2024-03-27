'use client'
import React, {
	createContext,
	useContext,
	useState,
} from 'react'
import { Product } from '../interfaces/products/Products'

export type ShopCartPropsType = {
    cartProducts: Product[],
    setCartProducts: (newCart: Product[]) => void
}

export const ShopCartContext = createContext<ShopCartPropsType>({
	cartProducts: [],
	setCartProducts: () => {},
})

interface ShopCartProviderProps {
    children: React.ReactNode
}

export default function ShopCartProvider({ children }: ShopCartProviderProps) {
	const [cartProducts, setCartProducts] = useState<Product[]>(() => {
		const savedCart = localStorage.getItem('shopCart')
		return savedCart ? JSON.parse(savedCart) : []
	})

	function setCartAndSave(newCart: Product[]) {
		setCartProducts(newCart)
		localStorage.setItem('shopCart', JSON.stringify(newCart))
	}

	const shopCartValue = {
		cartProducts,
		setCartProducts: setCartAndSave,
	}

	return (
		<ShopCartContext.Provider value={ shopCartValue }>
			{ children }
		</ShopCartContext.Provider>
	)
}

export function useShopCartContext() {
	return useContext(ShopCartContext)
}
