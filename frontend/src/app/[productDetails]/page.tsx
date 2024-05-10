'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useProductsContext } from '../contexts/ProductsContext'
import { Product } from '../interfaces/products/Product'
import NotFound from '../components/NotFound'

export default function ProductDetails() {
	const { getProduct } = useProductsContext()
	const productId = usePathname().slice(1)
	console.log(productId)
	
	const [product, setProduct] = useState<Product | undefined>(undefined)
	
	useEffect(() => {		
		const fetchProduct = async () => {
			if (!isNaN(Number(productId))) {
				const foundProduct = await getProduct(Number(productId))

				if (foundProduct) {
					setProduct(foundProduct)
				}
			}
		}

		console.log(product)
		fetchProduct()
	}, [productId])

	if (product === undefined) {
		return <NotFound />
	}

	return (
		<>
			<p>Product Details</p>
			<p>{ `${ product.name }` }</p>
		</>
	)
}
