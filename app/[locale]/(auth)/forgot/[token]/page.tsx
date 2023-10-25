import jwt from 'jsonwebtoken'

import prisma from '@/prisma/client'

import Reset from './Reset'

export default async function Page({ params: { token } }: { params: { token: string } }) {

    if (!process.env.NEXTAUTH_SECRET) throw new Error('Internal server error, please try again later.')

    let { email }: any = jwt.decode(token)

    jwt.verify(token, process.env.NEXTAUTH_SECRET)

    const { passwordResetToken }: any = await prisma.user.findUnique({ where: { email } })

    if (token != passwordResetToken) throw new Error('The password reset has reached its expiration date.')

    return <Reset
        token={token}
        email={email}
    />
}
