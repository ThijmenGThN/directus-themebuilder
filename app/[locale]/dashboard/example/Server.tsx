import { getServerSession } from "next-auth"

import options from "@/auth/options"

export default async function Page() {

    const session = await getServerSession(options)

    return (
        <div className="overflow-hidden rounded-md bg-white shadow">
            <ul role="list" className="divide-y divide-gray-200">
                <li className="px-6 py-4">
                    <p className="font-semibold">
                        Server
                    </p>
                    <p>
                        {session?.user.name} (<b>{session?.user.role}</b>)
                    </p>
                </li>
            </ul>
        </div>
    )
}
