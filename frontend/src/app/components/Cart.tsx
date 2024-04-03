import React from 'react'
import { useShopCartContext } from '../contexts/CartContext'
import Link from 'next/link'
import CartProducts from './CartProducts'

export default function Cart() {
	const { cartProducts } = useShopCartContext()

	return (
		<div>
			<p>Shopping Cart</p>
			{cartProducts.length < 1
				? <p>Empty</p>
				: <CartProducts />
			}
			<div className='border-red-400 border-2'>
				<p>Total</p>
				<p>{cartProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0)}</p>
			</div>
			<Link href='/checkout'>
				<button className='bg-gray-600 text-white'>
					Checkout
				</button>
			</Link>
		</div>
	)
}
