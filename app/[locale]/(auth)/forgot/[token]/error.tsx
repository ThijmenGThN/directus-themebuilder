"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import aLogo from '@/assets/logo.webp'

export default function Error() {
    const t = useTranslations('auth')

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
                    {t('password-reset-has-expired')}
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12 flex flex-col gap-y-4">

                    <p className="text-sm text-center font-medium text-gray-900">
                        {t('the-password-reset-has-reached-its-expiration-date')}
                    </p>

                    <Link href="/forgot" className="mt-5 flex w-full gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        {t('reset-your-password-again')}
                    </Link>

                    <Link href='/register' className="flex items-center justify-center w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {t('sign-up-for-a-new-account')}
                    </Link>
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
