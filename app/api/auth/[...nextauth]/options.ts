import prisma from '@/prisma/client'

import providers from './providers'

import type { Roles, User } from '@prisma/client'
import type { NextAuthOptions } from 'next-auth'

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        name: string
        email: string
        role: Roles
    }
}

declare module "next-auth" {
    interface Session {
        user: User
    }
}

const options: NextAuthOptions = {
    providers,
    callbacks: {
        async jwt({ token }) {
            const { id, name, email, role } = await prisma.user.findUnique({ where: { email: token.email } }) as User

            return { id, name, email, role }
        },
        async session({ session, token }) {
            token.name && (session.user.name = token.name)
            token.role && (session.user.role = token.role)

            return session
        },
        async signIn({ user: { name, email } }) {

            if (!name || !email) return false

            await prisma.user.upsert({
                where: { email },
                update: {},
                create: {
                    name,
                    email
                }
            })

            return true
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login'
    }
}

export default options