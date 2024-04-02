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
					<div key={ index } className='border-red-400 border-2'>
						<p>{ cartProduct.name }</p>
						<p>{ cartProduct.color }</p>
						<p>{ cartProduct.quantity }</p>
						<button
							className='bg-gray-600 text-white'
							onClick={ () => removeFromCart(cartProduct) }
						>
							remove
						</button>
					</div>
				))
			}
			<div className='border-red-400 border-2'>
				<p>Total</p>
				<p>{ cartProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0) }</p>
			</div>
			<button className='bg-gray-600 text-white'>
				Checkout
			</button>
		</div>
	)
}
