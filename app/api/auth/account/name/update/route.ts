import { z } from 'zod'
import prisma from '@/prisma/client'
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    try {
        const session = await getToken({ req })

        if (!session) return NextResponse.json('You are not authorized to perform this action.', { status: 401 })

        const { name } = await req.json()

        if (!z.string()
            .min(2)
            .max(32)
            .safeParse(name).success
        ) return NextResponse.json('The provided name does not meet the criteria.', { status: 400 })

        await prisma.user.update({
            where: { email: session.email },
            data: { name }
        })

        return NextResponse.json('Name of the user has succesfully been updated.', { status: 200 })
    }

    catch (error) {
        console.error(error)
        return NextResponse.json('Internal server error, try again later.', { status: 500 })
    }
}
