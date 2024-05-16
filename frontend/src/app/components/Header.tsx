import React from 'react'
import Link from 'next/link'

export default function Header() {
	return (
		<header>
			<Link
				href='/login'
			>
				<button>
					Login
				</button>
			</Link>
			<Link
				href='/register'
			>
				<button>
					Register
				</button>
			</Link>
			<Link
				href='/shop'
			>
				<button>
					Shop
				</button>
			</Link>
		</header>
	)
}