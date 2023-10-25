"use client"

import { z } from 'zod'
import Link from 'next/link'
import { useState } from "react"

import { useTranslations } from 'next-intl'
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"

import Form from '@/components/Form'

export default function Page() {
    const t = useTranslations()

    const [token, setToken] = useState<string>()

    async function onSubmit({ name }: { name: string }) {
        const res = await fetch('/api/auth/account/token/create', { method: 'POST', body: JSON.stringify({ name }) })

        if (res.status == 400) return new Error(t('dashboard.the-provided-token-name-is-too-long-or-short'))
        if (res.status == 409) return new Error(t('dashboard.an-api-token-with-the-same-name-already-exists'))
        if (res.status == 403) return new Error(t('dashboard.you-have-reached-the-maximum-amount-of-api-tokens-allowed'))
        if (!res.ok) return new Error(t('dashboard.sorry-something-unexpected-happened'))

        setToken(await res.json())
    }

    return (
        <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="px-4 py-5 flex gap-y-4 items-left flex-col justify-between md:items-center md:flex-row sm:px-6">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        API Tokens
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        {t('dashboard.private-authorization-tokens-to-request-data-from-our-endpoint')}
                    </p>
                </div>
            </div>

            <div className="px-4 py-5 sm:px-6">
                {token
                    ? <>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            {t('dashboard.your-new-token')}
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                            <p className="block w-full rounded-none truncate rounded-l-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 bg-gray-50 sm:text-sm sm:leading-6">
                                {token}
                            </p>
                            <button className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 group hover:bg-gray-50 focus:ring-2 focus:ring-inset focus:ring-primary focus:text-primary"
                                onClick={() => navigator.clipboard.writeText(token)}
                            >
                                <DocumentDuplicateIcon className="-ml-0.5 h-5 w-5 text-gray-400 group-focus:text-primary" />
                                {t('dashboard.copy')}
                            </button>
                        </div>

                        <p className="mt-3 text-xs leading-6 text-gray-600">
                            {t('dashboard.please-ensure-to-save-this-token-in-a-secure-location-as-once-you-close-this-window-it-will-no-longer-be-visible-to-you')}
                        </p>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Link className="flex gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                href="/dashboard/account"
                                prefetch={false}
                            >
                                {t('dashboard.return-to-overview')}
                            </Link>
                        </div>
                    </>
                    : <Form
                        onSubmit={onSubmit}
                        submit={{ label: t('dashboard.generate-token'), position: 'right' }}
                        cancel={{ label: t('dashboard.cancel'), redirect: '/dashboard/account' }}
                        description={t('dashboard.once-a-new-token-has-been-generated-you-will-be-able-to-view-it-in-the-overview-if-needed-you-can-easily-revoke-the-token-at-any-time')}
                        validator={
                            z.object({
                                name: z.string()
                                    .min(2, { message: t('auth.this-name-is-too-short') })
                                    .max(32, { message: t('auth.this-name-is-too-long') })
                            })
                        }
                        fields={[
                            { id: 'name', type: 'text', label: t('dashboard.token-name') }
                        ]}
                    />}
            </div>
        </div>
    )
}
