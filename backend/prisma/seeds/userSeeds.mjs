import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const saltRounds = 10
const adminPassword = 'boschiadm'
const testPassword = 'validpassword'
const hashedAdminPassword = await bcrypt.hash(adminPassword, saltRounds)
const hashedTestPassword = await bcrypt.hash(testPassword, saltRounds)

async function main() {
	await prisma.user.create({
		data: {
			email: 'mario@boschi.com',
			password: hashedAdminPassword,
			name: 'Mario Sanseverino',
			address: {
				create: [
					{ location: 'Av. Padre Leopoldo Brentano, 110 - Porto Alegre/RS' }
				]},
			birthday: '25051993',
		}
	})
	await prisma.user.create({
		data: {
			email: 'testemail@gmail.com',
			password: hashedTestPassword,
			name: 'Test',
			address: { create: [
				{ location: 'Test' }
			]},
			birthday: '08032024',
		}
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (error) => {
		console.log(error)
		prisma.$disconnect()
	})
