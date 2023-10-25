"use client"

import { z } from 'zod'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import gravatar from '@/helpers/gravatar'

import Form from '@/components/Form'
import OAuth from '../OAuth'

import aLogo from '@/assets/logo.webp'

export default function Page() {
    const t = useTranslations('auth')

    const [formEmail, setFormEmail] = useState<string>()
    const [hasBeenSent, setHasBeenSent] = useState<boolean>(false)

    const onSubmit = async ({ email }: any) => {
        if (!email) return

        const { ok, status } = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ email }) })

        if (status == 400) return new Error(t('the-provided-address-does-not-meet-the-criteria-of-an-email-address'))
        if (status == 403) return new Error(t('the-provided-email-address-is-already-taken'))
        if (!ok) return new Error(t('sorry-something-unexpected-happened'))

        setFormEmail(email)
        setHasBeenSent(true)
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src={aLogo}
                        alt=""
                    />
                </Link>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {t('sign-up-for-an-account')}
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    {
                        hasBeenSent
                            ? <div className="flex flex-col items-center justify-center gap-y-4">
                                <Image
                                    className="h-16 w-16 rounded-full bg-gray-50 border"
                                    src={gravatar(formEmail ?? '')}
                                    width={80}
                                    height={80}
                                    alt=""
                                />
                                <p className="text-sm font-medium text-gray-900">
                                    {formEmail}
                                </p>

                                <p className="text-sm mt-4 text-center font-medium text-gray-900">
                                    {t('we-have-sent-you-an-email-to-create-an-account')}
                                </p>
                            </div>
                            : <>
                                <Form
                                    onSubmit={onSubmit}
                                    validator={
                                        z.object({
                                            email: z.string()
                                                .min(2, { message: t('this-email-address-is-too-short') })
                                                .max(64, { message: t('this-email-address-is-too-long') })
                                                .email(t('this-email-address-is-not-valid'))
                                        })
                                    }
                                    submit={{ label: t('continue'), position: 'full' }}
                                    fields={[
                                        { id: 'email', type: 'email', label: t('email-address') }
                                    ]}
                                />

                                <OAuth />
                            </>
                    }
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/login">
                        ← {t('already-have-an-account')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
