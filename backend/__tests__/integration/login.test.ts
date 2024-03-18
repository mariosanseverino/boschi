import request from 'supertest'
import App from '../../src/app'

const testEmail = 'testemail@gmail.com'
const testPassword = 'validpassword'

describe('POST /login', () => {
	const { app } = new App()

	it('Should return "All fields must be filled"', async () => {
		const response = await request(app)
			.post('/login')
			.send({ email: 'invalid email' })

		expect(response.status).toBe(400)
		expect(response.body).toEqual({ message: 'All fields must be filled' })
	})

	it('Should return "Invalid email or password", when both fields are invalid', async () => {
		const response = await request(app)
			.post('/login')
			.send({ email: 'invalid email', password: 'invalid password' })

		expect(response.status).toBe(401)
		expect(response.body).toEqual({ message: 'Invalid email or password' })
	})

	it('Should return "Invalid email or password", when the email is valid but password is not', async () => {
		const response = await request(app)
			.post('/login')
			.send({ email: testEmail, password: 'pass' })

		expect(response.status).toBe(401)
		expect(response.body).toEqual({ message: 'Invalid email or password' })
	})

	it('In case of sucess, it should return a valid token', async () => {
		const response = await request(app)
			.post('/login')
			.send({ email: testEmail, password: testPassword })

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('token')
	})
})
