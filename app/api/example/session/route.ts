import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

import prisma from '@/prisma/client'

let apiSessionRequests = 0

export async function GET(req: NextRequest) {

    const session = await getToken({ req })
    if (!session) return NextResponse.json('You are not authorized to perform this action.', { status: 401 })

    apiSessionRequests++

    return NextResponse.json({
        users: {
            total: await prisma.user.count()
        },
        api: {
            requester: {
                name: session.name,
                owner: session.email
            },
            session: {
                requests: apiSessionRequests
            }
        }
    }, { status: 200 })

}
