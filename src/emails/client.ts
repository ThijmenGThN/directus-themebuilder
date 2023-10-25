import { z } from 'zod'
import { createTransport } from 'nodemailer'
import { render } from '@react-email/render'

import type { ReactElement } from 'react'

interface iOptions {
    to: string
    subject: string
}

export default async function Email(Component: ReactElement, options: iOptions) {
    if (
        !process.env.EMAIL_FROM ||
        !process.env.EMAIL_HOST ||
        !process.env.EMAIL_PORT ||
        !process.env.EMAIL_USER ||
        !process.env.EMAIL_PASS
    ) throw new Error('Missing EMAIL environment variables.')

    if (!z.object({
        to: z.string()
            .min(2, { message: "This email address is too short" })
            .max(64, { message: "This email address is too long" })
            .email("This email address is not valid"),
        subject: z.string()
            .min(2, { message: "This subject is too short" })
            .max(256, { message: "This subject is too long" })
    }).safeParse(options).success) throw new Error('Supplied options are invalid.')

    await createTransport({
        secure: true,
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }).sendMail({
        ...options,
        from: process.env.EMAIL_FROM,
        html: render(Component)
    })
}
