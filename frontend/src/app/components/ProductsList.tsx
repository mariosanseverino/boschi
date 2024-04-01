import React from 'react'
import { Product, ProductVariant } from '../interfaces/products/Products'
import ProductCard from './ProductCard'

interface ProductsListProps {
    products: Product[]
}

export default function ProductsList({ products }: ProductsListProps) {
	return (
		<>
			{ products.map((product, index) => {
				const uniqueColors: ProductVariant['color'][] = []
				product.variants.map((variant) => {
					if (!uniqueColors.includes(variant.color)) {
						uniqueColors.push(variant.color)
					}
				})
				return uniqueColors.map((color, colorIndex) => (
					<ProductCard
						key={ `${ index }-${ colorIndex }`}
						product={ product }
						color={ color }
					/>
				))
			})}
		</>
	)
}
