'use client'
import React from 'react'
import CartProduct from './CartProduct'
import { OrderProduct } from '../interfaces/orders/Order'
import { useCartContext } from '../contexts/CartContext'

type CartProductsListProps = {
    cartProducts: OrderProduct[]
}

export default function CartProductsList({ cartProducts }: CartProductsListProps) {
	const { removeFromCart, updateProductQuantity } = useCartContext()
    
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
