import React from 'react'
import { useCartContext } from '../contexts/CartContext'
import Link from 'next/link'
import { OrderProduct } from '../interfaces/orders/Order'
import CartProductsList from './CartProductsList'

export default function Cart() {
	const { cartProducts } = useCartContext()

	return (
		<div>
			<p>Shopping Cart</p>
			{cartProducts.length < 1
				? <p>Empty</p>
				: <CartProductsList cartProducts={ cartProducts }/>
			}
			<div className='border-red-400 border-2'>
				<p>Total</p>
				<p>{ `R$ ${ cartProducts.reduce((acc, product: OrderProduct) => acc + (product.price * product.quantity), 0) }` }</p>
			</div>
			<Link href='/checkout'>
				<button className='bg-gray-600 text-white'>
					Checkout
				</button>
			</Link>
		</div>
	)
}
