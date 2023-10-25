"use client"

import { useTranslations } from "next-intl"

export default function Page() {
    const t = useTranslations('dashboard')

    return (
        <div className="overflow-hidden rounded-md bg-white shadow">
            <ul role="list" className="divide-y divide-gray-200">
                <li className="px-6 py-16 text-center">
                    <p className="font-semibold">{t('welcome-to-the-dashboard-of-next-leaflet')}</p>
                    <p className="w-2/3 mx-auto mt-4">{t('an-optimized-tech-stack-for-efficiency-an-all-in-one-solution-to-quickly-build-modern-web-apps')}</p>
                </li>
            </ul>
        </div>
    )
}