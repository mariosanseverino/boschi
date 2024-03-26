'use client'
import React, { useEffect, useState } from 'react'
import { requestData } from '../requests'
import { Product } from '../interfaces/products/Products'
import ProductsList from '../components/ProductsList'

export default function Shop() {
	const [products, setProducts] = useState<Product[]>([])

	async function fetchProducts() {
		try {
			const allProducts = await requestData('/products')
			console.log(allProducts)
			setProducts(allProducts)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<section>
			<h1>shop</h1>
			<section>
				<ProductsList
					products={ products }
				/>
			</section>
		</section>
	)
}