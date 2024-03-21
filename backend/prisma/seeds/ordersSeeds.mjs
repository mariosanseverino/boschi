import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
  
async function main() {
	await prisma.order.create({
		data: {
			id: 1,
			discount: 0,
			shipping: 30,
			subtotal: 300,
			total: 330,
			userId: 1,
			addressLocation: 'Av. Padre Leopoldo Brentano, 110 - Porto Alegre/RS',
			OrderProduct: [{
				price: 150,
				color: 'White',
				size: 'S',
				quantity: 2,
				orderId: 1,
				productId: 1
			}],
			shipmentType: 'Express',
			orderStatus: 'Pending'
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
  