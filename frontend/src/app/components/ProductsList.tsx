import React from 'react'
import { Product } from '../interfaces/products/Products'
import ProductCard from './ProductCard'

interface ProductsListProps {
    products: Product[]
}

export default function ProductsList({ products }: ProductsListProps) {
	return (
		<>
			{ products.map((product, index) => (
				<ProductCard
					key={ index}
					product={ product }
				/>
			))}
		</>
	)
}
