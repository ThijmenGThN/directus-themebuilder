"use client"

import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'

import Form from '@/components/Form'

export default function Component() {
    const t = useTranslations()
    const { data: session, update } = useSession()

    const onSubmit = async ({ name }: any) => {
        const { ok } = await fetch('/api/auth/account/name/update', { method: 'POST', body: JSON.stringify({ name }) })

        if (!ok) return new Error(t('dashboard.sorry-something-unexpected-happened'))

        await update()
    }

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                    {t('dashboard.profile')}
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    {t('dashboard.information-related-to-your-account')}
                </p>
            </div>

            <div className='px-4 py-5 sm:px-6'>
                <Form
                    onSubmit={onSubmit}
                    validator={
                        z.object({
                            name: z.string()
                                .min(2, { message: t('auth.this-name-is-too-short') })
                                .max(32, { message: t('auth.this-name-is-too-long') })
                        })
                    }
                    submit={{ label: t('dashboard.save'), position: 'right' }}
                    fields={[
                        { id: 'name', type: 'text', label: t('dashboard.name'), value: session?.user.name }
                    ]}
                />
            </div>
        </div>
    )
}
