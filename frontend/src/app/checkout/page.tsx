'use client'
import React, { useState } from 'react'
import ShopCartProducts from '../components/ShopCartProducts'
import { useShopCartContext } from '../contexts/ShopCartContext'

enum ShippingOptions {
	Standard = 'Standard',
	Express = 'Express',
	NextDay = 'Next day'
}

export default function Checkout() {
	const { cartProducts } = useShopCartContext()
	const [shipping, setShipping] = useState(ShippingOptions.Standard)

	function calculateShipping() {
		switch(shipping) {
		case ShippingOptions.Standard:
			return 15.0
		case ShippingOptions.Express:
			return 30.0
		case ShippingOptions.NextDay:
			return 55.0
		default:
			return 0
		}
	}

	const subtotal = cartProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0)

	return (
		<>
			<h1>Checkout</h1>
			<ShopCartProducts
				cartProducts={ cartProducts }
			/>
			<fieldset>
				<label htmlFor='shipping'>Shipping</label>
				<select
					name='shipping'
					defaultValue='Standard'
					onChange={ ({ target: { value }}) => setShipping(value as ShippingOptions) }
				>
					<option value={ ShippingOptions.Standard }>Standard</option>
					<option value={ ShippingOptions.Express }>Express</option>
					<option value={ ShippingOptions.NextDay }>Next day</option>
				</select>
			</fieldset>
			<p>Subtotal { `R$ ${ subtotal }` }</p>
			<p>Shipping { `R$ ${ calculateShipping() }` }</p>
			<p>Total { `R$ ${ calculateShipping() + subtotal }` }</p>
		</>
	)
}
