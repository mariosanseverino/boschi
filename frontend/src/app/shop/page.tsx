'use client'
import React from 'react'
import ProductsList from '../components/ProductsList'
import Cart from '../components/Cart'
import { useProductsContext } from '../contexts/ProductsContext'

export default function Shop() {
	const { products, isLoading } = useProductsContext()

	return (
		<div className='flex justify-between'>
			<section>
				<h1>Shop</h1>
				{isLoading
					? 'Loading...'
					: <ProductsList
						products={products}
					/>
				}
			</section>
			<section>
				<Cart />
			</section>
		</div>
	)
}
