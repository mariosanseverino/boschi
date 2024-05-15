'use client'
import React from 'react'
import CartProduct from './CartProduct'
import { OrderProduct } from '../interfaces/orders/Order'
import { useCartContext } from '../contexts/CartContext'

export default function CartProductsList() {
	const { cartProducts, removeFromCart, updateProductQuantity } = useCartContext()

	return (
		<>
			{
				cartProducts.map((cartProduct: OrderProduct, index: number) => (
					<CartProduct
						key={ index }
						cartProduct={ cartProduct }
						removeFromCart={ removeFromCart }
						updateProductQuantity={ updateProductQuantity }
					/>
				))
			}
		</>
	)
}
