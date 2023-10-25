"use client"

import { z } from 'zod'
import Link from 'next/link'
import Image from 'next/image'
import jwt from 'jsonwebtoken'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import gravatar from '@/helpers/gravatar'

import Form from '@/components/Form'

import aLogo from '@/assets/logo.webp'

const callbackUrl = '/dashboard'

export default function Page({ params: { token } }: { params: { token: string } }) {
    const t = useTranslations('auth')

    let { email } = jwt.decode(token) as { email: string | undefined }
    if (!email) throw new Error(t('the-registration-has-reached-its-expiration-date'))

    const onSubmit = async ({ name, password }: any) => {
        const { ok, status } = await fetch('/api/auth/register/create', { method: 'POST', body: JSON.stringify({ name, password, token }) })

        if (status == 409) return new Error(t('an-account-with-this-email-address-has-already-been-registered'))
        if (status == 401) return new Error(t('the-provided-token-has-expired'))
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
                    {t('complete-your-registration')}
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <div className="flex mb-8 flex-col items-center justify-center gap-y-4">
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

                    <Form
                        onSubmit={onSubmit}
                        submit={{ label: t('sign-up'), position: 'full' }}
                        validator={
                            z.object({
                                name: z.string()
                                    .min(2, { message: t('this-name-is-too-short') })
                                    .max(32, { message: t('this-name-is-too-long') }),
                                password: z.string()
                                    .min(8, { message: t('this-password-is-too-short') })
                                    .max(64, { message: t('this-password-is-too-long') }),
                                repeatPassword: z.string()
                                    .min(8, { message: t('this-password-is-too-short') })
                                    .max(64, { message: t('this-password-is-too-long') })
                            }).refine(({ password, repeatPassword }) => password == repeatPassword, { message: t('the-passwords-do-not-match'), path: ['repeatPassword'] })
                        }
                        fields={[
                            { id: 'name', type: 'text', label: t('name') },
                            { id: 'password', type: 'password', label: t('password') },
                            { id: 'repeatPassword', type: 'password', label: t('repeat-password') }
                        ]}
                        options={[
                            "showPassword"
                        ]}
                    />
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/login">
                        ← {t('sign-in-to-a-different-account')}
                    </Link>
                </div>
            </div >
        </div >
    )
}
