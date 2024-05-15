'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CartProduct from '../components/CartProduct'
import { useCartContext } from '../contexts/CartContext'
import { ShipmentType } from '../interfaces/orders/Order'

export default function Checkout() {
	const router = useRouter()
	const { cartProducts, placeOrder } = useCartContext()
	const [shipping, setShipping] = useState<ShipmentType>('Standard')

	function calculateShipping() {
		switch (shipping) {
		case 'Standard':
			return 15.0
		case 'Express':
			return 30.0
		case 'NextDay':
			return 55.0
		default:
			return 0
		}
	}

	const subtotal = cartProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0)

	return (
		<>
			<h1>Checkout</h1>
			<CartProduct />
			<fieldset>
				<label htmlFor='shipping'>Shipping</label>
				<select
					name='shipping'
					defaultValue='Standard'
					onChange={ ({ target: { value } }) => setShipping(value as ShipmentType) }
				>
					<option value={ 'Standard' }>Standard</option>
					<option value={ 'Express' }>Express</option>
					<option value={ 'NextDay' }>Next day</option>
				</select>
			</fieldset>
			<p>Subtotal { `R$ ${ subtotal}` }</p>
			<p>Shipping { `R$ ${ calculateShipping() }` }</p>
			<p>Total { `R$ ${ calculateShipping() + subtotal }` }</p>
			<button
				className='bg-gray-600 text-white'
				onClick={ async () => {
					const now = new Date
					placeOrder({
						createdAt: now,
						updatedAt: now,
						discount: 0,
						shipping: calculateShipping(),
						subtotal,
						total: calculateShipping() + subtotal,
						userId: 1,
						addressId: 1,
						shipmentType: shipping,
						productsList: cartProducts
					}).then((order) => {
						if (order) {
							router.push(`/thankyou?orderId=${ order.id }`)
						}
					})
				}}
			>
				Finish
			</button>
		</>
	)
}
