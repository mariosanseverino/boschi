'use client'
import React, { useState } from 'react'
import { UserRegisterRequest } from '../interfaces/users/User'

type RegisterFormProps = {
	submitRegister: (userReq: UserRegisterRequest) => void
}

export default function RegisterForm({ submitRegister }: RegisterFormProps) {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [userReq, setUserReq] = useState<UserRegisterRequest>({
		email: '',
		password: '',
		name: '',
		cep: '',
		address: '',
		birthday: ''
	})

	function handleChange(value: string, inputName: string) {
		setUserReq((prevState) => ({
			...prevState,
			[inputName]: value
		}))
	}

	function submitForm() {
		setUserReq((prevState) => ({
			...prevState,
			name: `${ firstName } + ${ lastName }`
		}))

		submitRegister(userReq)
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
				<input required type='email' name='user-email' />
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
				<label htmlFor='cep'>CEP Code</label>
				<input required onChange={ ({ target: { value, name }}) => handleChange(value, name) } type='text' name='cep' placeholder='99999-999' />
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
