import React, { useState } from 'react'
import Link from 'next/link'
import { Product, ProductVariant } from '../interfaces/products/Product'
import { OrderProduct } from '../interfaces/orders/Order'
import { useProductsContext } from '../contexts/ProductsContext'
import ProductOptions from './ProductOptions'
import QuantitySelector from './QuantitySelector'
import AddToCartBtn from './AddToCartBtn'

interface ProductCardProps {
	product: Product,
	color: ProductVariant['color']
}

export default function ProductCard({ product, color }: ProductCardProps) {
	const { getProductSizes, getColorPrice } = useProductsContext()
	const [productQuantity, setProductQuantity] = useState<OrderProduct['quantity']>(1)
	const [selectedSize, setSelectedSize] = useState<ProductVariant['size']>('')
	const productSizes = getProductSizes(product.variants)

	return (
		<div className='border-red-400 border-2'>
			<Link href={ `/${ product.id }-${ color }` }>
				<h2>{ product.name }</h2>
			</Link>
			<h2>{ `R$ ${ getColorPrice(color, product) }` }</h2>
			<h2>{ color }</h2>
			<fieldset>
				<label htmlFor='product-quantity'>Quantity</label>
				<QuantitySelector
					value={ productQuantity}
					onChange={ setProductQuantity }
				/>
			</fieldset>
			<fieldset>
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
			</fieldset>
			<AddToCartBtn
				product={ product }
				color={ color }
				quantity={ productQuantity }
				size={ selectedSize }
			/>
		</div>
	)
}
