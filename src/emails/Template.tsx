import React from 'react'
import { Body, Html, Head, Tailwind, Container, Section, Text, Link, Img } from '@react-email/components'

interface iProps {
    assets: {
        logo: string
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

                    <Header title="Email template" logo={props.assets?.logo} />

                    <Container className="relative items-center bg-white px-6 py-12 rounded-lg shadow dark:bg-black">

                        <Text className='text-center'>
                            This is a template for emails, sent by next-leaflet.
                        </Text>

                    </Container>

                    <Text className="pt-5 pb-10 w-full text-center text-xs text-gray-500">
                        This message can be disregarded, if deemed irrelevant.
                    </Text>

                </Body>
            </Html>
        </Tailwind>
    )
}
