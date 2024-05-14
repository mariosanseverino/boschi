import React, { useState } from 'react'
import Link from 'next/link'
import { Product, ProductVariant } from '../interfaces/products/Product'
import { OrderProduct } from '../interfaces/orders/Order'
import { useCartContext } from '../contexts/CartContext'
import { useProductsContext } from '../contexts/ProductsContext'
import ProductOptions from './ProductOptions'

interface ProductCardProps {
	product: Product,
	color: ProductVariant['color']
}

export default function ProductCard({ product, color }: ProductCardProps) {
	const { getProductSizes } = useProductsContext()
	const [productQuantity, setProductQuantity] = useState<OrderProduct['quantity']>(1)
	const [selectedSize, setSelectedSize] = useState<ProductVariant['size']>('')
	const { addToCart } = useCartContext()
	const productSizes = getProductSizes(product.variants)

	return (
		<div className='border-red-400 border-2'>
			<Link href={ `/${product.id}` }>
				<h1>{ product.name }</h1>
			</Link>
			<h2>{color}</h2>
			<fieldset>
				<label htmlFor='product-quantity'>Quantity</label>
				<input
					type='number'
					name='product-quantity'
					min={1}
					value={productQuantity}
					onChange={({ target: { value } }) => setProductQuantity(Number(value))}
				/>
			</fieldset>
			<fieldset>
				{  }
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
			<button
				onClick={() => addToCart({
					productId: product.id,
					name: product.name,
					color: color,
					price: product.variants.find((variant) => variant.color === color)!.price,
					quantity: productQuantity,
					size: selectedSize
				})}
				className='bg-gray-600 text-white'
			>
					Add to cart
			</button>
		</div>
	)
}
