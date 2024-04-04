import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.product.create({
		data: {
			name: 'Basic T-Shirt',
			description: 'Made of 100% Persian Cotton',
			variants: {
				create: [
					{
						price: 150,
						color: 'White',
						size: 'S',
						quantity: 10
					},
					{
						price: 150,
						color: 'White',
						size: 'M',
						quantity: 10
					},
					{
						price: 150,
						color: 'White',
						size: 'L',
						quantity: 10
					},
					{
						price: 150,
						color: 'Black',
						size: 'S',
						quantity: 10
					},
					{
						price: 150,
						color: 'Black',
						size: 'M',
						quantity: 10
					},
					{
						price: 150,
						color: 'Black',
						size: 'L',
						quantity: 10
					},
				]
			}
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
