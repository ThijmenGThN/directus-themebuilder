import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

import prisma from '@/prisma/client'

export async function POST(req: NextRequest) {

    if (!process.env.NEXTAUTH_SECRET) return NextResponse.json('Internal server error.', { status: 500 })

    try {
        const session = await getToken({ req })

        if (!session) return NextResponse.json('You are not authorized to perform this action.', { status: 401 })

        const { id } = await req.json()

        if (!id) return NextResponse.json('A valid API-token ID must be provided.', { status: 400 })

        await prisma.apiToken.delete({ where: { id, owner: session.email } })

        return NextResponse.json('The API-token has succesfully been removed.', { status: 200 })
    }

    catch (error) {
        console.error(error)
        return NextResponse.json('Internal server error, try again later.', { status: 500 })
    }
}
