'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useProductsContext } from '../contexts/ProductsContext'
import { Product, ProductVariant } from '../interfaces/products/Product'
import NotFound from '../components/NotFound'
import ProductOptions from '../components/ProductOptions'

export default function ProductDetails() {
	const { getProduct, getProductColors, getProductSizes } = useProductsContext()
	const productId = usePathname().slice(1)
	
	const [product, setProduct] = useState<Product | undefined>(undefined)
	const [productColors, setProductColors] = useState<ProductVariant['color'][]>([])
	const [productSizes, setProductSizes] = useState<ProductVariant['size'][]>([])
	const [selectedColor, setSelectedColor] = useState<ProductVariant['color']>('')
	const [selectedSize, setSelectedSize] = useState<ProductVariant['size']>('')


	useEffect(() => {		
		const fetchProduct = async () => {
			if (!isNaN(Number(productId))) {
				const foundProduct = await getProduct(Number(productId))

				if (foundProduct) {
					setProduct(foundProduct)
					setProductColors(getProductColors(foundProduct.variants))
					setProductSizes(getProductSizes(foundProduct.variants))
				}
			}
		}

		fetchProduct()
	}, [productId, productColors])

	if (product === undefined) {
		return <NotFound />
	}

	return (
		<>
			<p>Product Details</p>
			<p>{ `${ product.name }` }</p>
			<p>{ `${ product.description }` }</p>
			<p>Select color</p>
			{ productColors.map((color, colorIndex) => (
				<ProductOptions
					key={ colorIndex }
					name='product-color'
					value={ color }
					selected={ selectedColor === color }
					onChange={ () => setSelectedColor(color) }
				>
					<span className='px-4 py-1' style={{ backgroundColor: color }} />
				</ProductOptions>
			)) }
			<p>Select size</p>
			{ productSizes.map((size, sizeIndex) => (
				<ProductOptions
					key={ sizeIndex }
					name='product-size'
					value={ size }
					selected={ selectedSize === size }
					onChange={ () => setSelectedSize(size) }
				>
					{ size }
				</ProductOptions>
			)) }
		</>
	)
}