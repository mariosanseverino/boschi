'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCartContext } from '../contexts/CartContext'
import { Order } from '../interfaces/orders/Order'

export default function ThankYou() {
	const searchParams = useSearchParams()
	const orderId = searchParams.get('orderId')
	const { findOrder } = useCartContext()
	const [order, setOrder] = useState<Order | null>(null)

	function formatDate(createdAt: Date) {
		const date = new Date(createdAt)
		const dateFormat = date.toLocaleDateString('en-US', {
			day: 'numeric', 
			month: 'long', 
			year: 'numeric' 
		})
		return dateFormat
	}

	useEffect(() => {
		async function getOrder(orderId: Order['id']) {
			const order = await findOrder(orderId)
			if (order) {
				setOrder(order)				
			}
		}

		if (orderId) {
			getOrder(Number(orderId))
		}
	}, [orderId])
	
	if (!order) {
		return <p>Loading...</p>
	}
	
	return (
		<Suspense>
			<section>
				<h1>Order Successful!</h1>
				<h2>Thank you for your purchase.</h2>
				<p>
					{ `Order ID: ${ orderId }` }
				</p>
				<div>
					<h2>Order Summary:</h2>
					<p>{ `${ formatDate(order.createdAt) }` }</p>
					<ul>
						{ order.productsList && order.productsList.map((product, productIndex) => (
							<li key={ productIndex }>
								{ <p>{ product.name }</p> }
								{ <p>R$ { product.price }</p> }
								{ <p>{ product.color }</p> }
								{ <p>Size { product.size }</p> }
							</li>
						)) }
					</ul>
					<div>
						<p>Discount R$ { `${ order.discount }` }</p>
						<p>Subtotal R$ { `${ order.subtotal }` }</p>
						<p>Shipping R$ { `${ order.shipping }` }</p>
						<p>Total R$ { `${ order.total }` }</p>
					</div>
				</div>
			</section>
		</Suspense>
	)
}
