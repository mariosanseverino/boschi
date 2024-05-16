import React from 'react'
import { useCartContext } from '../contexts/CartContext'
import { Product } from '../interfaces/products/Product'
import { OrderProduct } from '../interfaces/orders/Order'

type AddToCartBtnProps = {
    product: Product,
    color: OrderProduct['color'],
    size: OrderProduct['size']
    quantity: OrderProduct['quantity'],
}

export default function AddToCartBtn({ product, color, quantity, size }: AddToCartBtnProps) {
	const { addToCart } = useCartContext()
	function checkProps() {
		if (!product || !color || !quantity || !size || size === '') {
			return true
		}
	}

	return (
		<button
			onClick={ () => addToCart({
				productId: product.id,
				name: product.name,
				color: color,
				price: product.variants.find((variant) => variant.color === color)!.price,
				quantity,
				size
			}) }
			className='bg-gray-600 text-white disabled:bg-red-400 enabled:bg-green-400'
			disabled={ checkProps() }
		>
            Add to cart
		</button>

	)
}