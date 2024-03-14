import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.product.create({
        data: {
            name: 'Basic T-Shirt',
            price: 150,
            description: 'Made of 100% Persian Cotton',
            ProductVariant: {
                create: [
                    {
                        color: 'White',
                        size: 'S',
                        quantity: 100
                    },
                    {
                        color: 'White',
                        size: 'M',
                        quantity: 100
                    },
                    {
                        color: 'White',
                        size: 'L',
                        quantity: 100
                    },
                    {
                        color: 'Black',
                        size: 'S',
                        quantity: 100
                    },
                    {
                        color: 'Black',
                        size: 'M',
                        quantity: 100
                    },
                    {
                        color: 'Black',
                        size: 'L',
                        quantity: 100
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
        console.log(error);
        prisma.$disconnect()
    })
