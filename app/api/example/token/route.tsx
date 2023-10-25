import { NextRequest, NextResponse } from "next/server"

import prisma from '@/prisma/client'

import { getApiToken } from "@/helpers/api/token"

let apiSessionRequests = 0

export async function GET(req: NextRequest) {

    const session = await getApiToken({ req })
    if (!session) return NextResponse.json('You are not authorized to perform this action.', { status: 401 })

    apiSessionRequests++

    return NextResponse.json({
        users: {
            total: await prisma.user.count()
        },
        api: {
            requester: {
                name: session.name,
                owner: session.owner
            },
            session: {
                requests: apiSessionRequests
            }
        }
    }, { status: 200 })

}
