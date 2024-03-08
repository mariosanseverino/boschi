import request from 'supertest'
import App from '../../src/app'

describe('POST /login', () => {
    const { app } = new App()

    it('Should return: Invalid email or password', async () => {
        const response = await request(app)
            .post('/login')
            .send({ email: 'invalid email', password: 'invalid password' })

        expect(response.status).toBe(401)
        expect(response.body).toEqual({ message: 'Invalid email or password' })
    })
})
