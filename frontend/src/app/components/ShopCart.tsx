import React from 'react'
import { useShopCartContext } from '../contexts/ShopCartContext'

export default function ShopCart() {
	const { cartProducts } = useShopCartContext()
    
	return (
		<div>
			<p>Shopping Cart</p>
			{ cartProducts.length < 1
				? <p>Empty</p>
				: cartProducts.map((cartProduct, index) => (<p key={ index }>{ cartProduct.name }</p>))
			}
		</div>
	)
}
