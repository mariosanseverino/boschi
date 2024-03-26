import React from 'react'
import { Product } from '../interfaces/products/Products'

interface ProductsListProps {
    products: Product[]
}

export default function ProductsList({ products }: ProductsListProps) {
	return (
		<>
			{ products.map((product, index) => (<p key={ index }>{ product.name }</p>))}
		</>
	)
}
