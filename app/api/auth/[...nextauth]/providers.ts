import bcrypt from 'bcrypt'

import Credentials from 'next-auth/providers/credentials'

import prisma from '@/prisma/client'

const providers = [
    Credentials({
        name: "Credentials",
        credentials: {
            email: { label: "E-mail", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if (!credentials || !credentials.email) throw new Error('Invalid credentials')

            const user = await prisma.user.findUnique({ where: { email: credentials.email } })

            if (!user || !user.password) throw new Error('Invalid credentials')
            if (!await bcrypt.compare(credentials.password, user.password)) throw new Error('Invalid credentials')

            return user
        }
    })
]

export default providers