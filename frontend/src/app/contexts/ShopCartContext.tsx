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
	updateProductQuantity: (productToUpdate: OrderProduct, quantity: OrderProduct['quantity']) => void
}

export const ShopCartContext = createContext<ShopCartPropsType>({
	cartProducts: [],
	addToCart: () => {},
	removeFromCart: () => {},
	updateProductQuantity: () => {}
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

	function updateProductQuantity(updateProduct: OrderProduct, quantity: OrderProduct['quantity']) {
		const currentCart = [...cartProducts]
		const productToUpdate = currentCart.find((product) => {
			product.productId === updateProduct.productId
			&& product.color === updateProduct.color
			&& product.size === updateProduct.size
		})

		if (productToUpdate) {
			productToUpdate.quantity = quantity
			setCartAndSave(currentCart)
		}

	}

	const shopCartValue = {
		cartProducts,
		addToCart,
		removeFromCart,
		updateProductQuantity
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
