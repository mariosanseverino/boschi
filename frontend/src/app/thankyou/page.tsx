'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCartContext } from '../contexts/CartContext'
import { Order } from '../interfaces/orders/Order'

export default function ThankYou() {
	const searchParams = useSearchParams()
	const orderId = searchParams.get('orderId')
	const { findOrder } = useCartContext()
	const [order, setOrder] = useState<Order>({} as Order)

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
				console.log(order)
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
				<h2>Thank you for your purchase</h2>
				<p>
					{ `Order ID: ${ orderId }` }
				</p>
				<div>
					<h2>Order Details:</h2>
					<p>{ `${ formatDate(order.createdAt) }` }</p>
				</div>
			</section>
		</Suspense>
	)
}
