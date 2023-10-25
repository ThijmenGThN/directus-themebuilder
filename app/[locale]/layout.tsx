import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider as Localizer } from 'next-intl'

import Session from './Session'

import { locales } from '../../middleware'

import '@/styles/globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'next-leaflet',
    description: 'An optimized tech stack for efficiency.'
}

const inter = Inter({ subsets: ['latin'] })

export default async function Layout({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string } }) {

    locales.some(cur => cur === locale) ?? notFound()

    let messages
    try { messages = (await import(`../../src/locales/${locale}.json`)).default }
    catch (error) { notFound() }

    return (
        <html lang={locale} className="h-full">
            <body className={inter.className + ' h-full'}>
                <Localizer locale={locale} messages={messages}>
                    <Session>
                        {children}
                    </Session>
                </Localizer>
            </body>
        </html>
    )
}

{/* <Head>
    <title>Theme Builder - Directus</title>

    <meta content="Theme Builder" property="og:title" />
    <meta content="Transform Directus with a splash of color, streamlined for effortless use." property="og:description" />
    <meta content="https://themebuilder.thijmenheuvelink.nl" property="og:url" />

    <meta content="https://i.imgur.com/bmYd1T4.png" property="og:image" />

    <meta content="#6644FF" data-react-helmet="true" name="theme-color" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

    <link rel="manifest" href="/site.webmanifest" />
</Head> */}
