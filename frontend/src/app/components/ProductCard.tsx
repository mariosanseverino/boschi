import React from 'react'
import { Product, ProductVariant } from '../interfaces/products/Products'
import { useShopCartContext } from '../contexts/ShopCartContext'

interface ProductCardProps {
    product: Product,
	color: ProductVariant['color']
}

export default function ProductCard({ product, color }: ProductCardProps) {
	const { addToCart } = useShopCartContext()
	return (
		<div>
			<h1>{ product.name }</h1>
			<h2>{ color }</h2>
			<button
				onClick={ () => addToCart({
					productId: product.id,
					name: product.name,
					color: color,
					price: product.variants.find((variant) => variant.color === color)!.price,
					quantity: 1,
					size: 'S'
				}) }
				className='bg-gray-600 text-white'
			>
                add to cart
			</button>
		</div>
	)
}
