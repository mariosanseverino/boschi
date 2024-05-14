import React from 'react'

type ProductOptionsProps = {
    name: string,
    value: string,
    children: React.ReactNode,
    selected: boolean,
    onChange: () => void
}

export default function ProductOptions({ name, value, children, selected, onChange }: ProductOptionsProps) {
	return (
		<label
			htmlFor={ name }
			onClick={ onChange }
		>
			<input
				type='radio'
				name={ name }
				value={ value }
				hidden 
			/>
			<span className={ `px-4 py-2 ${ selected ? 'border-2 border-blue-400' : '' }` }>
				{ children }
			</span>
		</label>  
	)
}