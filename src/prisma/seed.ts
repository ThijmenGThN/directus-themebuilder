const bcrypt = require("bcrypt")
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {

    // ----- Example ----
    //
    // await prisma.user.upsert({
    //     where: { email: 'admin@leaflet.app' },
    //     update: {},
    //     create: {
    //         name: 'Developer Account',
    //         email: 'admin@leaflet.app',
    //         password: await bcrypt.hash('admin', 12),
    //     }
    // })

}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async () => await prisma.$disconnect())
