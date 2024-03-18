import request from 'supertest'
import App from '../../src/app'

const testEmail = 'testemail@gmail.com'
const testPassword = 'validpassword'
const testName = 'Test'
const testAddress = 'Test'
const testBirthday = '08032024'
const testNewUser = {
	email: 'newtestemail@gmail.com',
	password: testPassword,
	name: testName,
	address: testAddress,
	birthday: testBirthday
}
const responseNewUser = {
	'id': 3,
	'email': 'newtestemail@gmail.com',
	'name': 'Test',
	'address': 'Test',
	'birthday': '08032024'
}

describe('POST /register', () => {
	const { app } = new App()

	const requiredFields = ['email', 'password', 'name', 'address', 'birthday']

	for (const field of requiredFields) {
		it(`Should return "All fields must be filled" when ${field} is missing`, async () => {
			const requestBody = {
				email: testEmail,
				password: testPassword,
				name: testName,
				address: testAddress,
				birthday: testBirthday,
				[field]: undefined
			}

			const response = await request(app)
				.post('/register')
				.send(requestBody)

			expect(response.status).toBe(400)
			expect(response.body).toEqual({ message: 'All fields must be filled' })
		})
	}

	it('Should return "Invalid email or password", when the email is with the wrong format', async () => {
		const response = await request(app)
			.post('/register')
			.send({
				email: 'invalid email',
				password: testPassword,
				name: testName,
				address: testAddress,
				birthday: testAddress
			})

		expect(response.status).toBe(401)
		expect(response.body).toEqual({ message: 'Invalid email or password' })
	})

	it('In case of success, it should return the user info, except the password', async () => {
		const response = await request(app)
			.post('/register')
			.send(testNewUser)

		expect(response.status).toBe(200)
		expect(response.body).toEqual(responseNewUser)
	})
})
