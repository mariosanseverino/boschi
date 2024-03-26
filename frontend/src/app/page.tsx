'use client'
import Link from 'next/link'
import React from 'react'

export default function Home() {

	return (
		<main>
			<h1>
				Boschi

			</h1>
			<Link
				href='/login'
			>
					login
			</Link>
			<Link
				href='/shop'
			>
					shop
			</Link>
		</main>
	)
}