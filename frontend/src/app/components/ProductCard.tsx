import React, { useState } from 'react'
import { Product, ProductVariant } from '../interfaces/products/Products'
import { useShopCartContext } from '../contexts/ShopCartContext'

interface ProductCardProps {
    product: Product,
	color: ProductVariant['color']
}

export default function ProductCard({ product, color }: ProductCardProps) {
	const [productQuantity, setProductQuantity] = useState(1)
	const { addToCart } = useShopCartContext()

	return (
		<div className='border-red-400 border-2'>
			<h1>{ product.name }</h1>
			<h2>{ color }</h2>
			<fieldset>
				<label htmlFor='product-quantity'>Quantity</label>
				<input
					type='number'
					name='product-quantity'
					min={ 1 }
					value={ productQuantity }
					onChange={ ({ target: { value } }) => setProductQuantity(Number(value)) }
				/>
			</fieldset>
			<button
				onClick={ () => addToCart({
					productId: product.id,
					name: product.name,
					color: color,
					price: product.variants.find((variant) => variant.color === color)!.price,
					quantity: productQuantity,
					size: 'S'
				}) }
				className='bg-gray-600 text-white'
			>
                add to cart
			</button>
		</div>
	)
}
