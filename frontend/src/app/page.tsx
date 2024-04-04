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
				<button>
					Login
				</button>
			</Link>
			<Link
				href='/shop'
			>
				<button>
					Shop
				</button>
			</Link>
		</main>
	)
}