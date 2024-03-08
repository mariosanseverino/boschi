import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const saltRounds = 10
const password = 'boschiadm'
const hashedPassword = await bcrypt.hash(password, saltRounds)

async function main() {
    const admin = await prisma.user.create({
        data: {
            email: 'mario@boschi.com',
            password: hashedPassword,
            name: 'Mario Sanseverino',
            address: 'Av. Padre Leopoldo Brentano, 110 - Porto Alegre/RS',
            birthday: '25051993',
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
