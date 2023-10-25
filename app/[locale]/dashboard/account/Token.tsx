"use client"

import Link from "next/link"

import DeleteToken from "./token/Delete"

import { useTranslations } from "next-intl"

import type { ApiToken } from "@prisma/client"

export default function Page({ tokens }: { tokens: Array<ApiToken> }) {
    const t = useTranslations('dashboard')

    return (
        <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="px-4 py-5 flex gap-y-4 items-left flex-col justify-between md:items-center md:flex-row sm:px-6">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        API Tokens
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        {t('private-authorization-tokens-to-request-data-from-our-endpoint')}
                    </p>
                </div>

                <Link className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    href="/dashboard/account/token"
                >
                    {t('generate-new-token')}
                </Link>
            </div>

            <div className="space-y-6">
                <ul role="list" className="divide-y divide-gray-100">
                    {
                        tokens.length > 0 && tokens.map((token: ApiToken) =>
                            <li key={token.id} className="flex px-4 sm:px-6 items-center justify-between gap-x-6 py-5">
                                <div className="min-w-0">
                                    <div className="flex items-start gap-x-3">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            {token.name}
                                        </p>
                                    </div>
                                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                        <p className="whitespace-nowrap">
                                            {t('created-on')} {new Date(token.createdOn).toLocaleString('en', { month: "long", day: "numeric", year: "numeric" })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-none items-center gap-x-4">
                                    <DeleteToken id={token.id} />
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
