"use client"

import { z } from "zod"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"

import Form from '@/components/Form'

const callbackUrl = '/dashboard'

export default function Component() {
    const t = useTranslations('auth')
    const router = useRouter()

    async function onSubmit({ email, password }: { email: string, password: string }) {
        const { error }: any = await signIn('credentials', { email, password, redirect: false })
        if (error) return new Error(t('invalid-credentials-try-again-or-reset-your-password'))

        router.refresh()
        router.push(callbackUrl)
    }

    // Already load the dashboard to make the signin feel swift.
    useEffect(() => { router.prefetch(callbackUrl) }, [router])

    return (
        <>
            <Form
                onSubmit={onSubmit}
                submit={{ label: t('sign-in'), position: 'full' }}
                validator={
                    z.object({
                        email: z.string()
                            .min(2, { message: t('this-email-address-is-too-short') })
                            .max(64, { message: t('this-email-address-is-too-long') }).email(t('this-email-address-is-not-valid')),
                        password: z.string()
                            .min(8, { message: t('this-password-is-too-short') })
                            .max(64, { message: t('this-password-is-too-long') })
                    })
                }
                fields={[
                    { id: 'email', type: 'email', label: t('email-address') },
                    { id: 'password', type: 'password', label: t('password') }
                ]}
                options={[
                    'showPassword'
                ]}
            />

            <div className="flex mt-5 items-center justify-between">
                <div className="text-sm leading-6">
                    <Link href="/forgot" className="font-semibold text-primary hover:text-primary-600">
                        {t('forgot-password')}
                    </Link>
                </div>
                <div className="text-sm leading-6">
                    <Link href="/register" className="font-semibold text-primary hover:text-primary-600">
                        {t('create-an-account')}
                    </Link>
                </div>
            </div>
        </>
    )
}
