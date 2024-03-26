'use client'
import React, { useState } from 'react'
import { requestLogin } from '../requests'
import { Token } from '../interfaces/users/Token'
import api from '../requests'


export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function submitLogin(event: React.FormEvent) {
		event.preventDefault()

		try {
			const { token }: Token = await requestLogin('/login', { email, password })
			localStorage.setItem('authToken', token)
			api.defaults.headers.common['Authorization'] = `Bearer ${ token }`
			console.log('Login sucess. Token: ', token)
			
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<form onSubmit={ submitLogin }>
			<fieldset>
				<label
					htmlFor='email'
				>
                    Email:{' '}
				</label>
				<input
					onChange={ ({ target: { value } }) => setEmail(value) }
					value={ email }
					className='bg-gray-200'
					type='email'
					name='email'
					id='login-email'
				/>
			</fieldset>
			<fieldset>
				<label htmlFor=''>
                    Password:{' '}
				</label>
				<input
					onChange={ ({ target: { value } }) => setPassword(value) }                
					value={ password }
					className='bg-gray-200'
					type='password'
					name='password'
					id='login-password'
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
