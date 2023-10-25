"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { signIn, getProviders } from "next-auth/react"

const callbackUrl = '/dashboard'

export default function Component() {
    const t = useTranslations()

    const [providers, setProviders] = useState<Array<any>>([])

    useEffect(() => { getProviders().then(({ credentials, ...OAuth }: any) => setProviders(Object.values(OAuth))) }, [])

    return providers.length > 0 && (
        <>
            <div className="relative mt-5">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-6 text-gray-900">
                        {t('auth.or-continue-with')}
                    </span>
                </div>
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-4">
                {
                    providers.map((provider: any) =>
                        <li key={provider.id}>
                            <button className="flex w-full items-center justify-center gap-3 rounded-md bg-black hover:bg-zinc-900 px-3 py-1.5 text-white"
                                onClick={() => signIn(provider.id, { callbackUrl })}
                            >
                                <span className="text-sm font-semibold leading-6">
                                    {provider.name}
                                </span>
                            </button>
                        </li>
                    )
                }
            </ul>
        </>
    )
}