"use client"

import { z } from 'zod'
import Link from 'next/link'
import Image from 'next/image'
import jwt from 'jsonwebtoken'
import { signIn } from "next-auth/react"
import { useTranslations } from 'next-intl'

import gravatar from '@/helpers/gravatar'

import Form from '@/components/Form'

import aLogo from '@/assets/logo.webp'

const callbackUrl = '/dashboard'

export default function Component({ token, email }: { token: string, email: string }) {
    const t = useTranslations('auth')

    const onSubmit = async ({ password }: any) => {
        const { ok, status } = await fetch('/api/auth/forgot/update', { method: 'POST', body: JSON.stringify({ token, password }) })

        if (status == 401) return new Error(t('password-reset-has-expired'))
        if (!ok) return new Error(t('sorry-something-unexpected-happened'))

        signIn('credentials', { email, password, callbackUrl })
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
                    {t('update-your-password')}
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12 flex flex-col gap-y-4">
                    <div className="flex flex-col items-center justify-center gap-y-4">
                        <Image
                            className="h-16 w-16 rounded-full bg-gray-50 border"
                            src={gravatar(email)}
                            width={80}
                            height={80}
                            alt=""
                        />
                        <p className="text-sm font-medium text-gray-900">
                            {email}
                        </p>
                    </div>

                    <div className="mt-8">
                        <Form
                            onSubmit={onSubmit}
                            validator={
                                z.object({
                                    password: z.string()
                                        .min(8, { message: t('this-password-is-too-short') })
                                        .max(64, { message: t('this-password-is-too-long') }),
                                    repeatPassword: z.string()
                                        .min(8, { message: t('this-password-is-too-short') })
                                        .max(64, { message: t('this-password-is-too-long') })
                                }).refine(({ password, repeatPassword }) => password == repeatPassword, { message: t('the-passwords-do-not-match'), path: ['repeatPassword'] })
                            }
                            submit={{ label: t('confirm'), position: 'full' }}
                            fields={[
                                { id: 'password', type: 'password', label: t('password') },
                                { id: 'repeatPassword', type: 'password', label: t('repeat-password') }
                            ]}
                            options={[
                                'showPassword'
                            ]}
                        />
                    </div>
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/login">
                        ← {t('sign-in-to-a-different-account')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
