import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where: {
            id: 1,
            email: 'admin@boschi.com',
        },
        update: {},
        create: {
            id: 1,
            email: 'mario@boschi.com',
            password: 'boschiadm',
            name: 'Mario Sanseverino',
            address: 'Av. Padre Leopoldo Brentano, 110 - Porto Alegre/RS',
            birthday: '25051993',
        }
    })
    console.log({ admin });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.log(error);
        prisma.$disconnect()
    })
