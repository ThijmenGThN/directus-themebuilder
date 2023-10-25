import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server"

import prisma from '@/prisma/client'
import Email from '@/emails/client'

import eRegister from '@/emails/Register'

export async function POST(req: NextRequest) {

    if (!(
        process.env.NEXTAUTH_URL &&
        process.env.NEXTAUTH_SECRET
    )) return NextResponse.json('Internal server error.', { status: 500 })

    try {
        const { email } = await req.json()

        if (!z.string()
            .min(2)
            .max(64)
            .email()
            .safeParse(email).success
        ) return NextResponse.json('The provided address does not meet the criteria of an email address.', { status: 400 })

        if (await prisma.user.findUnique({ where: { email } })) return NextResponse.json('The provided email address is already taken.', { status: 403 })

        const token = jwt.sign({ email }, process.env.NEXTAUTH_SECRET, { expiresIn: '1d' })

        Email(
            eRegister({
                email,
                link: process.env.NEXTAUTH_URL + '/en/register/' + token,
                assets: { logoUrl: process.env.NEXTAUTH_URL + '/logo.webp' }
            }),
            {
                to: email,
                subject: 'Complete your registration'
            }
        )

        return NextResponse.json('We have sent you an email to complete your registration.', { status: 200 })
    }

    catch (error) {
        console.error(error)
        return NextResponse.json('Internal server error, try again later.', { status: 500 })
    }

}
