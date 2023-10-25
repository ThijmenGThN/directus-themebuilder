"use client"

import Link from 'next/link'
import { Fragment } from 'react'
import { useTranslations } from 'next-intl'
import { Menu, Transition } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react'

import { classNames } from "@/helpers/tailwind"

interface iProps {
    children: React.ReactNode
    className: string
    navigation: Array<{
        name: string
        href: string
    }>
}

export default function Component(props: iProps) {
    const t = useTranslations('dashboard')
    const { data: session } = useSession()

    return (
        <Menu as="div">
            <Menu.Button className={props.className}>
                {props.children}
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 m-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                        <p className="text-sm">
                            {t('signed-in-as')}
                        </p>
                        <p className="truncate text-sm font-medium text-gray-900">
                            {session?.user?.email}
                        </p>
                    </div>
                    <div className="py-1">
                        {props.navigation.map((item, index) =>
                            <Menu.Item key={index}>
                                {({ active }) =>
                                    <Link
                                        href={item.href}
                                        className={
                                            classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )
                                        }
                                    >
                                        {item.name}
                                    </Link>}
                            </Menu.Item>)}
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) =>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/login' })}
                                    className={
                                        classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-left text-sm'
                                        )
                                    }
                                >
                                    {t('sign-out')}
                                </button>}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
