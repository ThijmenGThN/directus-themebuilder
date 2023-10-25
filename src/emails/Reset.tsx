import React from 'react'
import { Body, Html, Head, Tailwind, Container, Section, Text, Link, Img } from '@react-email/components'

import gravatar from '../helpers/gravatar'

interface iProps {
    email: string,
    link: string,
    assets: {
        logoUrl: string
    }
}

export function Header({ title, logo }: { title: string, logo: string }) {
    return (
        <Section className='py-10'>
            <Link href="/">
                <Img
                    className="mx-auto h-10 w-auto"
                    src={logo}
                />
            </Link>
            <Text className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {title}
            </Text>
        </Section>
    )
}

export default function Email(props: iProps) {
    return (
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            "primary": '#11999e',
                            "primary-600": '#0e7d81'
                        }
                    }
                }
            }}
        >
            <Html >
                <Head />
                <Body className='flex flex-col bg-gray-50 font-sans'>

                    <Header title="Reset your password" logo={props.assets?.logoUrl ?? ''} />

                    <Container className="relative items-center bg-white px-6 py-12 rounded-lg shadow dark:bg-black">
                        <Img
                            className="mx-auto h-16 w-16 rounded-full bg-gray-50 border"
                            src={gravatar(props.email ?? '')}
                        />
                        <Text className="text-center w-full text-sm font-medium text-gray-900">{props.email ?? 'Unknown User'}</Text>

                    <Section>
                        <Text className="text-sm text-center font-medium text-gray-500">By continuing, you will be prompted to update your password.</Text>

                        <Link href={props.link} className="mt-10 flex gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600">
                            Continue
                        </Link>
                    </Section>
                </Container>

                <Text className="pt-5 pb-10 w-full text-center text-xs text-gray-500">
                    This message can be disregarded, if deemed irrelevant.
                </Text>

            </Body>
        </Html>
        </Tailwind>
    )
}
