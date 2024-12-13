'use client'
import React, { useState } from 'react'
import api from '../requests'
import { requestLogin } from '../requests'
import { Token } from '../interfaces/users/Token'
import { User, UserResponse } from '../interfaces/users/User'
import LoginForm from '../components/LoginForm'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../contexts/UserContext'


export default function Login() {
	const [email, setEmail] = useState<User['email']>('')
	const [password, setPassword] = useState<User['password']>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const router = useRouter()
	const { setUser } = useUserContext()

	async function submitLogin(event: React.FormEvent) {
		event.preventDefault()
		setIsLoading(true)

		try {
			const { token, user }: { token: Token, user: UserResponse } = await requestLogin('/login', { email, password })
			localStorage.setItem('authToken', token)
			api.defaults.headers.common['Authorization'] = `Bearer ${ token }`
			setUser(user)
			router.push('/')
		} catch (error) {
			window.alert(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<h1>Login</h1>
			{ isLoading
				? <p>Loading...</p>
				: (	<LoginForm
					email={ email }
					setEmail={ setEmail }
					password={ password }
					setPassword={ setPassword }
					submitLogin={ (event: React.FormEvent) => submitLogin(event) }
				/>) }
		</>
	)
}
