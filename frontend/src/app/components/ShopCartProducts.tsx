import React from 'react'
import { OrderProduct } from '../interfaces/products/Products'
import { useShopCartContext } from '../contexts/ShopCartContext'

interface ShopCartProducts {
    cartProducts: OrderProduct[]
}

export default function ShopCartProducts ({ cartProducts }: ShopCartProducts) {
	const { removeFromCart, updateProductQuantity } = useShopCartContext()

	return (
		<>
			{
				cartProducts.map((cartProduct: OrderProduct, index) => (
					<div key={ index } className='border-red-400 border-2'>
						<p>{ cartProduct.name }</p>
						<p>{ cartProduct.color }</p>
						<fieldset>
							<input
								type='number'
								name='quantity'
								defaultValue={ cartProduct.quantity }
								onBlur={ ({ target: { value } }) => updateProductQuantity(cartProduct, Number(value)) }
							/>
						</fieldset>
						<button
							className='bg-gray-600 text-white'
							onClick={ () => removeFromCart(cartProduct) }
						>
							remove
						</button>
					</div>
				))
			}
		</>
	)
}