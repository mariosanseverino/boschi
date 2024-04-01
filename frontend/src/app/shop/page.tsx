'use client'
import React from 'react'
import ProductsList from '../components/ProductsList'
import ShopCart from '../components/ShopCart'
import { useProductsContext } from '../contexts/ProductsContext'

export default function Shop() {
	const { products, isLoading } = useProductsContext()

	return (
		<section>
			<h1>shop</h1>
			<section>
				{ isLoading
					? 'Loading...'
					: <ProductsList
						products={products}
					/>
				}
			</section>
			<section>
				<ShopCart />
			</section>
		</section>
	)
}
