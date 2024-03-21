import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
  
async function main() {
	await prisma.order.create({
		data: {
			userId: 1,
			discount: 0,
			shipping: 30,
			subtotal: 300,
			total: 330,
			addressLocation: 'Av. Padre Leopoldo Brentano, 110 - Porto Alegre/RS',
			shipmentTypeId: 'Express',
			productsList: [{
				productId: 1,
				price: 150,
				quantity: 2,
				color: 'White',
				size: 'S'
			}]
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
  