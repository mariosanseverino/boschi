import React, { Dispatch, SetStateAction } from 'react'

type LoginFormProps = {
    email: string,
    setEmail: Dispatch<SetStateAction<string>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    submitLogin: (event: React.FormEvent) => void
}

export default function LoginForm({ email, setEmail, password, setPassword, submitLogin }: LoginFormProps) {
	return (
		<form onSubmit={ submitLogin }>
			<fieldset>
				<label
					htmlFor='email'
				>
                    Email
				</label>
				<input
					onChange={ ({ target: { value } }) => setEmail(value) }
					value={ email }
					className='bg-gray-200'
					type='email'
					name='email'
				/>
			</fieldset>
			<fieldset>
				<label htmlFor='password'>
                    Password
				</label>
				<input
					onChange={ ({ target: { value } }) => setPassword(value) }                
					value={ password }
					className='bg-gray-200'
					type='password'
					name='password'
				/>
			</fieldset>
			<button
				type='submit'
				className='bg-gray-600 text-white'
			>
                Login
			</button>
		</form>
	)
}
