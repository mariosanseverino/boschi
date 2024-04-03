'use client'
import React, {
	createContext,
	useContext,
	useState,
	useEffect
} from 'react'
import { OrderProduct } from '../interfaces/products/Products'

export type CartContextPropsType = {
	cartProducts: OrderProduct[],
	addToCart: (addedProduct: OrderProduct) => void,
	removeFromCart: (removedProduct: OrderProduct) => void,
	updateProductQuantity: (productToUpdate: OrderProduct, quantity: OrderProduct['quantity']) => void
}

export const CartContext = createContext<CartContextPropsType>({
	cartProducts: [],
	addToCart: () => { },
	removeFromCart: () => { },
	updateProductQuantity: () => { }
})

interface CartProviderProps {
	children: React.ReactNode
}

export default function CartProvider({ children }: CartProviderProps) {
	const [cartProducts, setCartProducts] = useState<OrderProduct[]>([])

	function setCartAndSave(newCart: OrderProduct[]) {
		setCartProducts(newCart)
		if (typeof window !== 'undefined') {
			localStorage.setItem('shopCart', JSON.stringify(newCart))
		}
	}

	function addToCart(addedProduct: OrderProduct) {		
		const findProduct = cartProducts.find((product: OrderProduct) => 
			product.productId === addedProduct.productId
			&& product.color === addedProduct.color
			&& product.size === addedProduct.size)
		
		if (findProduct) {
			updateProductQuantity(addedProduct, addedProduct.quantity)
		} else {
			const newCart = [...cartProducts, addedProduct]
			setCartAndSave(newCart)
		}
	}

	function removeFromCart(removedProduct: OrderProduct) {
		const currentCart = [...cartProducts]
		const newCart = currentCart.filter((product) => product.productId !== removedProduct.productId
			|| product.color !== removedProduct.color
			|| product.size !== removedProduct.size)
		setCartAndSave(newCart)
	}

	function updateProductQuantity(updateProduct: OrderProduct, quantity: OrderProduct['quantity']) {
		const currentCart = [...cartProducts]
		const productToUpdate = currentCart.find((product) => {
			return product.productId === updateProduct.productId
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
		<CartContext.Provider value={shopCartValue}>
			{children}
		</CartContext.Provider>
	)
}

export function useShopCartContext() {
	return useContext(CartContext)
}
