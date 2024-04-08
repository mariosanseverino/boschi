import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { User, UserRegisterRequest } from '../interfaces/users/User'

export default function Register() {
	async function submitRegister(userReq: UserRegisterRequest): Promise<User> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
			method: 'POST',
			body: JSON.stringify(userReq)
		})
		const newUser = await response.json()
		return newUser as User
	}

	return (
		<>
			<h1>Register</h1>
			<RegisterForm
				submitRegister={ submitRegister }
			/>
		</>
	)
}