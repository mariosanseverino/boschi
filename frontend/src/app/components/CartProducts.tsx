import React from 'react'
import { OrderProduct } from '../interfaces/orders/Order'
import { useCartContext } from '../contexts/CartContext'

interface CartProducts {
	cartProducts: OrderProduct[]
}

export default function CartProducts() {
	const { cartProducts, removeFromCart, updateProductQuantity } = useCartContext()

	return (
		<>
			{
				cartProducts.map((cartProduct: OrderProduct, index: number) => (
					<div key={ index } className='border-red-400 border-2'>
						<p>{ cartProduct.name }</p>
						<p>{ cartProduct.color }</p>
						<fieldset>
							<input
								type='number'
								name='quantity'
								min={ 1 }
								value={ cartProduct.quantity }
								onChange={ ({ target: { value } }) => updateProductQuantity(cartProduct, Number(value)) }
							/>
						</fieldset>
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