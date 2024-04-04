'use client'
import React, { useState } from 'react'
import CartProducts from '../components/CartProducts'
import { useShopCartContext } from '../contexts/CartContext'
import { ShipmentType } from '../interfaces/orders/Order'

export default function Checkout() {
	const { cartProducts, placeOrder } = useShopCartContext()
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
			<CartProducts />
			<fieldset>
				<label htmlFor='shipping'>Shipping</label>
				<select
					name='shipping'
					defaultValue='Standard'
					onChange={({ target: { value } }) => setShipping(value as ShipmentType)}
				>
					<option value={ 'Standard' }>Standard</option>
					<option value={ 'Express' }>Express</option>
					<option value={ 'NextDay' }>Next day</option>
				</select>
			</fieldset>
			<p>Subtotal {`R$ ${subtotal}`}</p>
			<p>Shipping {`R$ ${calculateShipping()}`}</p>
			<p>Total {`R$ ${calculateShipping() + subtotal}`}</p>
			<button
				className='bg-gray-600 text-white'
				onClick={ () => placeOrder({
					discount: 0,
					shipping: calculateShipping(),
					subtotal,
					total: calculateShipping() + subtotal,
					userId: 1,
					address: 'Av. Padre Leopoldo Brentano, 110 - Porto Alegre/RS',
					shipmentType: shipping,
					productsList: cartProducts
				}) }
			>
				Finish
			</button>
		</>
	)
}
