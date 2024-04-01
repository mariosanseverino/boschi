import React from 'react'
import { useShopCartContext } from '../contexts/ShopCartContext'
import { OrderProduct } from '../interfaces/products/Products'

export default function ShopCart() {
	const { cartProducts, removeFromCart } = useShopCartContext()

	return (
		<div>
			<p>Shopping Cart</p>
			{ cartProducts.length < 1
				? <p>Empty</p>
				: cartProducts.map((cartProduct: OrderProduct, index) => (
					<div key={ index }>
						<p>{ cartProduct.name }</p>
						<button
							onClick={ () => removeFromCart(cartProduct) }
						>
							remove
						</button>
					</div>
				))
			}
		</div>
	)
}
