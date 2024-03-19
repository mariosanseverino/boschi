import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.orderStatus.create({
		data: {
			status: 'Pending'
		}
	})

	await prisma.orderStatus.create({
		data: {
			status: 'Processing'
		}
	})

	await prisma.orderStatus.create({
		data: {
			status: 'Shipped'
		}
	})

	await prisma.orderStatus.create({
		data: {
			status: 'Delivered'
		}
	})

	await prisma.orderStatus.create({
		data: {
			status: 'Canceled'
		}
	})
    
	await prisma.orderStatus.create({
		data: {
			status: 'Refunded'
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
