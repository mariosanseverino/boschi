import React from 'react'
import { useShopCartContext } from '../contexts/ShopCartContext'
import { Product } from '../interfaces/products/Products'

export default function ShopCart() {
	const { cartProducts, setCartProducts } = useShopCartContext()
    
	function removeFromCart(removedProduct: Product) {
		const currentCart = [...cartProducts]
		const newCart = currentCart.filter((product) => product.id !== removedProduct.id)
		setCartProducts(newCart)
	}

	return (
		<div>
			<p>Shopping Cart</p>
			{ cartProducts.length < 1
				? <p>Empty</p>
				: cartProducts.map((cartProduct, index) => (
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
