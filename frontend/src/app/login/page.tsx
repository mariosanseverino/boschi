'use client'
import React, { useState } from 'react'
import { requestLogin } from '../requests'
import { Token } from '../interfaces/users/Token'
import api from '../requests'
import LoginForm from '../components/LoginForm'


export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function submitLogin(event: React.FormEvent) {
		event.preventDefault()

		try {
			const { token }: Token = await requestLogin('/login', { email, password })
			localStorage.setItem('authToken', token)
			api.defaults.headers.common['Authorization'] = `Bearer ${ token }`			
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<h1>Login</h1>
			<LoginForm
				email={ email }
				setEmail={ setEmail }
				password={ password }
				setPassword={ setPassword }
				submitLogin={ (event: React.FormEvent) => submitLogin(event) }
			/>
		</>
	)
}
