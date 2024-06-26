import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
  
async function main() {
	await prisma.order.create({
		data: {
			id: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
			discount: 0,
			shipping: 30,
			subtotal: 300,
			total: 330,
			userId: 1,
			addressId: 1,
			OrderProduct: [{
				price: 150,
				name: 'Basic T-Shirt',
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
  