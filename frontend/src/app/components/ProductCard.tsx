import React from 'react'
import { Product } from '../interfaces/products/Products'
import { useShopCartContext } from '../contexts/ShopCartContext'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
	const { cartProducts, setCartProducts } = useShopCartContext()

	function addToCart(addedProduct: Product) {
		const currentCart = [...cartProducts]
		const newCart = [...currentCart, addedProduct]
		setCartProducts(newCart)
	}

	return (
		<div>
			<h1>{ product.name }</h1>
			<button
				onClick={ () => addToCart(product) }
				className='bg-gray-600 text-white'
			>
                add to cart
			</button>
		</div>
	)
}
