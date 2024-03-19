import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.shipmentType.create({
		data: {
			type: 'Standard'
		}
	})

	await prisma.shipmentType.create({
		data: {
			type: 'Express'
		}
	})
    
	await prisma.shipmentType.create({
		data: {
			type: 'NextDay'
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
