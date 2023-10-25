"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import OAuth from '../OAuth'
import Credentials from './Credentials'

import aLogo from '@/assets/logo.webp'

export default function Page() {
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
                    {t('sign-in-to-your-account')}
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <Credentials />

                    <OAuth />
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/">
                        ← {t('back-to-homepage')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
