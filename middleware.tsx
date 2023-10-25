import { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'

export const defaultLocale = 'en'
export const locales = ['en', 'nl'] // Also reflect changes in → src/components/locale/Switcher

const publicPages = ['/', '/login', '/register', '/forgot']

const intlMiddleware = createIntlMiddleware({ locales, defaultLocale })

const authMiddleware = withAuth(
    function onSuccess(req) { return intlMiddleware(req) },
    {
        callbacks: { authorized: ({ token }) => token != null },
        pages: {
            signIn: '/login'
        }
    }
)

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(`^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`, 'i')
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)
    return isPublicPage ? intlMiddleware(req) : (authMiddleware as any)(req)
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
}
