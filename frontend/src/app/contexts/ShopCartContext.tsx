'use client'
import React, {
	createContext,
	useContext,
	useState,
	useEffect
} from 'react'
import { OrderProduct } from '../interfaces/products/Products'

export type ShopCartPropsType = {
    cartProducts: OrderProduct[],
	addToCart: (addedProduct: OrderProduct) => void,
	removeFromCart: (removedProduct: OrderProduct) => void,
}

export const ShopCartContext = createContext<ShopCartPropsType>({
	cartProducts: [],
	addToCart: () => {},
	removeFromCart: () => {}
})

interface ShopCartProviderProps {
    children: React.ReactNode
}

export default function ShopCartProvider({ children }: ShopCartProviderProps) {
	const [cartProducts, setCartProducts] = useState<OrderProduct[]>([])

	function setCartAndSave(newCart: OrderProduct[]) {
		setCartProducts(newCart)
		if (typeof window !== 'undefined') {
			localStorage.setItem('shopCart', JSON.stringify(newCart))
		}
	}

	function addToCart(addedProduct: OrderProduct) {
		const currentCart = [...cartProducts]
		const newCart = [...currentCart, addedProduct]
		setCartAndSave(newCart)
	}

	function removeFromCart(removedProduct: OrderProduct) {
		const currentCart = [...cartProducts]
		const newCart = currentCart.filter((product) => product.productId !== removedProduct.productId)
		setCartAndSave(newCart)
	}

	const shopCartValue = {
		cartProducts,
		addToCart,
		removeFromCart,
	}

	useEffect(() => {
		const savedCart = localStorage.getItem('shopCart')
		if (savedCart) {
			setCartProducts(JSON.parse(savedCart))
		}
	}, [])

	return (
		<ShopCartContext.Provider value={ shopCartValue }>
			{ children }
		</ShopCartContext.Provider>
	)
}

export function useShopCartContext() {
	return useContext(ShopCartContext)
}
