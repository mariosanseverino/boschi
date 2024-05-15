'use client'
import React from 'react'

interface QuantitySelectorProps {
	value: number,
	min?: number,
	onChange: (value: number) => void
}

export default function QuantitySelector ({ value, min = 1, onChange }: QuantitySelectorProps) {
	const handleDecrease = () => {
		if (value > min) {
			onChange(value - 1)
		}
	}

	const handleIncrease = () => {
		onChange(value + 1)
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(event.target.value)
		if (newValue >= min) {
			onChange(newValue)
		}
	}

	return (
		<div>
			<button className='px-2 bg-white' onClick={ handleDecrease }>
				-
			</button>
			<input
				type='number'
				name='quantity'
				min={ min }
				value={ value }
				className='remove-arrow text-center'
				onChange={ handleInputChange }
			/>
			<button className='px-2 bg-white' onClick={ handleIncrease }>
				+
			</button>
		</div>
	)
}
