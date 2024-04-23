'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function ThankYou() {
	const searchParams = useSearchParams()
	const orderId = searchParams.get('orderId')
	
	return (
		<>
			<h1>Thank you for your purchase!</h1>
			<p>
				{ `Order ID: ${ orderId }` }
			</p>
		</>
	)
}
