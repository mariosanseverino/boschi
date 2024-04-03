import React from 'react'
import { useShopCartContext } from '../contexts/ShopCartContext'
import Link from 'next/link'
import ShopCartProducts from './ShopCartProducts'

export default function ShopCart() {
	const { cartProducts } = useShopCartContext()

	return (
		<div>
			<p>Shopping Cart</p>
			{ cartProducts.length < 1
				? <p>Empty</p>
				: <ShopCartProducts cartProducts={ cartProducts } />
			}
			<div className='border-red-400 border-2'>
				<p>Total</p>
				<p>{ cartProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0) }</p>
			</div>
			<Link href='/checkout'>
				<button className='bg-gray-600 text-white'>
					Checkout
				</button>
			</Link>
		</div>
	)
}
