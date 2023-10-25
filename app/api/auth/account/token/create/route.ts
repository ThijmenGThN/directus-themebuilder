import { z } from "zod"
import crypto from "crypto"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

import prisma from '@/prisma/client'

export async function POST(req: NextRequest) {

    if (!process.env.NEXTAUTH_SECRET) return NextResponse.json('Internal server error.', { status: 500 })

    try {
        const session = await getToken({ req })
        if (!session) return NextResponse.json('You are not authorized to perform this action.', { status: 401 })

        const { name } = await req.json()

        if (!z.string()
            .min(2, { message: "This name is too short" })
            .max(32, { message: "This name is too long" })
            .safeParse(name).success
        ) return NextResponse.json('The provided token name is too long or short.', { status: 400 })

        if (await prisma.apiToken.findFirst({ where: { name, owner: session.email } })) return NextResponse.json('An API token with the same name already exists.', { status: 409 })
        if (await prisma.apiToken.count({ where: { owner: session.email } }) >= 25) return NextResponse.json('You have reached the maximum amount of API tokens allowed.', { status: 403 })

        const token = crypto.randomBytes(20).toString()

        await prisma.apiToken.create({
            data: {
                name,
                token: await bcrypt.hash(token, 12),
                owner: session.email
            }
        })

        return NextResponse.json(jwt.sign({ name, owner: session.email, token }, process.env.NEXTAUTH_SECRET), { status: 200 })
    }

    catch (error) {
        console.error(error)
        return NextResponse.json('Internal server error, try again later.', { status: 500 })
    }
}
