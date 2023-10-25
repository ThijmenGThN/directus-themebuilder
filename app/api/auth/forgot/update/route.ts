import { NextRequest, NextResponse } from "next/server"

import { z } from "zod"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import prisma from '@/prisma/client'

export async function POST(req: NextRequest) {

    if (!(
        process.env.NEXTAUTH_URL &&
        process.env.NEXTAUTH_SECRET
    )) return NextResponse.json('Internal server error.', { status: 500 })

    try {
        const { password, token } = await req.json()

        if (!z.string()
            .min(8)
            .max(64)
            .safeParse(password).success
        ) return NextResponse.json('The provided password does not meet the required criteria.', { status: 400 })

        let email
        jwt.verify(token, process.env.NEXTAUTH_SECRET, (err: any, decoded: any) => {
            if (err) return NextResponse.json('The provided token has expired.', { status: 401 })
            email = decoded.email
        })

        const { passwordResetToken }: string | any = await prisma.user.findUnique({ where: { email } })

        if (token != passwordResetToken) return NextResponse.json('The provided token has expired.', { status: 401 })

        await prisma.user.update({
            where: { email },
            data: {
                password: await bcrypt.hash(password, 12),
                passwordResetToken: null
            }
        })

        return NextResponse.json('The password has succesfully been updated to the one provided.', { status: 200 })
    } 
    
    catch {
        return NextResponse.json('Internal server error, try again later.', { status: 500 })
    }
}
