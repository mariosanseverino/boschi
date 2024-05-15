import React from 'react'
import { OrderProduct } from '../interfaces/orders/Order'
import QuantitySelector from './QuantitySelector'

type CartProductProps = {
	cartProduct: OrderProduct,
	removeFromCart: (cartProduct: OrderProduct) => void,
	updateProductQuantity: (cartProduct: OrderProduct, newQuantity: OrderProduct['quantity']) => void
}

export default function CartProduct({ cartProduct, removeFromCart, updateProductQuantity }: CartProductProps ) {
	return (
		<>
			<div className='border-red-400 border-2'>
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
		</>
	)
}
