import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CartProvider from './contexts/CartContext'
import ProductsProvider from './contexts/ProductsContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='bg-gray-300'>
			<ProductsProvider>
				<CartProvider>
					<body className={inter.className}>
						{children}
					</body>
				</CartProvider>
			</ProductsProvider>
		</html>
	)
}
