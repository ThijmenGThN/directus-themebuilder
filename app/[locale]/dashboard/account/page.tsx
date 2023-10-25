import { getServerSession } from 'next-auth'

import Name from './Name'
import Token from './Token'

export default async function Page() {

    const session = await getServerSession()

    const tokens = session?.user.email ? await prisma.apiToken.findMany({ where: { owner: session.user.email } }) : []

    return (
        <div className='flex flex-col gap-y-6'>
            <Name />
            <Token tokens={tokens} />
        </div>
    )
}
