import React from 'react'
import { Product } from '../interfaces/products/Product'
import ProductCard from './ProductCard'
import { useProductsContext } from '../contexts/ProductsContext'

interface ProductsListProps {
    products: Product[]
}

export default function ProductsList({ products }: ProductsListProps) {
	const { getProductColors: getUniqueColors } = useProductsContext()

	return (
		<>
			{ products.map((product, index) => (
				getUniqueColors(product.variants).map((color, colorIndex) => (
					<ProductCard
						key={ `${ index }-${ colorIndex }`}
						color={ color }
						product={ product }
					/>
				))
			)) }
		</>
	)
}
