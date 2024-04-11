'use client'
import React, { useState } from 'react'
import { User, UserRegisterRequest } from '../interfaces/users/User'

export default function RegisterForm() {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const emptyUserRequest = {
		email: '',
		password: '',
		name: '',
		address: {
			street: '',
			number: 0,
			complement: '',
			postalCode: '',
			city: '',
			state: '',
			country: ''
		},
		birthday: ''
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_userReq, setUserReq] = useState<UserRegisterRequest>(emptyUserRequest)

	function handleChange(value: string | number, inputName: string) {
		const addressProperties = Object.keys(emptyUserRequest.address)

		if (addressProperties.includes(inputName)) {
			setUserReq((prevState) => ({
				...prevState,
				address: {
					...prevState.address,
					[inputName]: value
				}
			}))
		} else {
			setUserReq((prevState) => ({
				...prevState,
				[inputName]: value
			}))
		}
	}

	async function registerUser(userReq: UserRegisterRequest): Promise<User> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
			method: 'POST',
			body: JSON.stringify(userReq)
		})
		const newUser = await response.json()
		return newUser as User
	}

	function submitForm() {
		setUserReq((prevState) => {
			const updatedUserReq = {
				...prevState,
				name: `${ firstName } + ${ lastName }`
			}
	
			registerUser(updatedUserReq)
	
			return updatedUserReq
		})
	}

	return (
		<form onSubmit={ submitForm }>
			<fieldset>
				<label htmlFor='first-name'>First Name</label>
				<input required onChange={ ({ target: { value } }) => setFirstName(value) } type='text' name='first-name' />
			</fieldset>
			<fieldset>
				<label htmlFor='last-name'>Last Name</label>
				<input required onChange={ ({ target: { value } }) => setLastName(value) } type='text' name='last-name' />
			</fieldset>
			<fieldset>
				<label htmlFor='user-email'>Email</label>
				<input required onChange={ ({ target: { value, name } }) => handleChange(value, name) } type='email' name='user-email' />
			</fieldset>
			<fieldset>
				<label htmlFor='email'>Confirm Email</label>
				<input required onChange={ ({ target: { value, name } }) => handleChange(value, name) } type='email' name='email' />
			</fieldset>
			<fieldset>
				<label htmlFor='user-password'>Password</label>
				<input required type='password' name='user-password' />
			</fieldset>
			<fieldset>
				<label htmlFor='password'>Confirm Password</label>
				<input required onChange={ ({ target: { value, name } }) => handleChange(value, name) } type='password' name='password' />
			</fieldset>
			<fieldset>
				<label htmlFor='postalCode'>Postal Code</label>
				<input required onChange={ ({ target: { value, name }}) => handleChange(value, name) } type='text' name='postalCode' placeholder='99999-999' />
			</fieldset>
			<fieldset>
				<label htmlFor='address'>Birthday</label>
				<input required onChange={ ({ target: { value, name } }) => handleChange(value, name) } type='date' name='address' />
			</fieldset>
			<button
				type='submit'
				className='bg-gray-600 text-white'
			>
                Register
			</button>
		</form>

	)
}
