import React from 'react'
import { OrderProduct } from '../interfaces/orders/Order'
import { useCartContext } from '../contexts/CartContext'
import QuantitySelector from './QuantitySelector'

interface CartProduct {
	cartProducts: OrderProduct[]
}

export default function CartProduct() {
	const { cartProducts, removeFromCart, updateProductQuantity } = useCartContext()

	return (
		<>
			{
				cartProducts.map((cartProduct: OrderProduct, index: number) => (
					<div key={ index } className='border-red-400 border-2'>
						<p>{ cartProduct.name }</p>
						<p>{ `R$ ${ cartProduct.price }` }</p>
						<p>{ cartProduct.color }</p>
						<p>{ `Size ${ cartProduct.size }` }</p>
						<QuantitySelector
							value={ cartProduct.quantity}
							onChange={ (newQuantity) => updateProductQuantity(cartProduct, newQuantity) }

						/>
						<button
							className='bg-gray-600 text-white'
							onClick={ () => removeFromCart(cartProduct) }
						>
							Remove
						</button>
					</div>
				))
			}
		</>
	)
}