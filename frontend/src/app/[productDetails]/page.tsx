'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useProductsContext } from '../contexts/ProductsContext'
import { Product, ProductVariant } from '../interfaces/products/Product'
import NotFound from '../components/NotFound'
import ProductOptions from '../components/ProductOptions'
import QuantitySelector from '../components/QuantitySelector'
import { OrderProduct } from '../interfaces/orders/Order'
import AddToCartBtn from '../components/AddToCartBtn'

export default function ProductDetails() {
	const { getProduct, getProductColors, getProductSizes, getColorPrice } = useProductsContext()
	const pathname = usePathname()
	const pathSegments = pathname.split('-')
	const productId = pathSegments[0].slice(1)
	let selectedColorFromURL: ProductVariant['color']

	if (pathSegments.length > 1) {
		selectedColorFromURL = pathSegments[pathSegments.length - 1]
	}

	const [product, setProduct] = useState<Product | undefined>(undefined)
	const [productColors, setProductColors] = useState<ProductVariant['color'][]>([])
	const [productSizes, setProductSizes] = useState<ProductVariant['size'][]>([])
	const [selectedColor, setSelectedColor] = useState<ProductVariant['color']>('')
	const [selectedSize, setSelectedSize] = useState<ProductVariant['size']>('')
	const [selectedQuantity, setSelectedQuantity] = useState<OrderProduct['quantity']>(1)

	useEffect(() => {		
		const fetchProduct = async () => {
			if (!isNaN(Number(productId))) {
				const foundProduct = await getProduct(Number(productId))

				if (foundProduct) {
					const colors = getProductColors(foundProduct.variants)
					const sizes = getProductSizes(foundProduct.variants)
					setProduct(foundProduct)
					setProductColors(colors)
					setProductSizes(sizes)
					
					const initialColor = colors.includes(selectedColorFromURL) ? selectedColorFromURL : colors[0]
					setSelectedColor(initialColor)
					setSelectedSize(sizes[0])
				}
			}
		}

		fetchProduct()
	}, [productId])

	if (product === undefined) {
		return <NotFound />
	}

	return (
		<>
			<p>Product Details</p>
			<h2>{ `${ product.name }` }</h2>
			<h1>{ `R$ ${ getColorPrice(selectedColor, product) }` }</h1>
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
			<p>{ `${ product.description }` }</p>
			<p>Select quantity</p>
			<QuantitySelector
				value={ selectedQuantity}
				onChange={ setSelectedQuantity }
			/>
			<AddToCartBtn
				product={ product }
				color={ selectedColor }
				size={ selectedSize }
				quantity={ selectedQuantity }
			/>
		</>
	)
}
