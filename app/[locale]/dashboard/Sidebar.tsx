"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import gravatar from '@/helpers/gravatar'
import { classNames } from "@/helpers/tailwind"

import Dropdown from './Dropdown'
import Loading from '@/components/Loader'

import aLogo from '@/assets/logo.webp'

import {
    Bars3Icon,
    BellIcon,
    Squares2X2Icon,
    MagnifyingGlassIcon,
    XMarkIcon,
    CpuChipIcon
} from '@heroicons/react/24/outline'

const navigation = [
    { name: "Dashboard", href: '/dashboard', icon: Squares2X2Icon },
    { name: "Example", href: '/dashboard/example', icon: CpuChipIcon }
]

const homePath = "/dashboard"

export default function Component({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { data: session, status } = useSession()

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>

                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                    <Link href={homePath} className="flex h-12 shrink-0 mt-5 items-center">
                                        <Image
                                            className="h-8 w-auto"
                                            src={aLogo}
                                            alt=""
                                        />
                                    </Link>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    {navigation.map((item, index) =>
                                                        <li key={index}>
                                                            <Link
                                                                href={item.href}
                                                                onClick={() => setSidebarOpen(false)}
                                                                className={
                                                                    classNames(
                                                                        pathname.endsWith(item.href)
                                                                            ? 'bg-gray-50 text-primary'
                                                                            : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )
                                                                }
                                                            >
                                                                <item.icon
                                                                    className={
                                                                        classNames(
                                                                            pathname.endsWith(item.href) ? 'text-primary' : 'text-gray-400 group-hover:text-primary',
                                                                            'h-6 w-6 shrink-0'
                                                                        )
                                                                    }
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    )}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                    <Link href={homePath} className="flex h-12 shrink-0 mt-5 items-center">
                        <Image
                            className="h-8 w-auto"
                            src={aLogo}
                            alt=""
                        />
                    </Link>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item, index) =>
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className={
                                                    classNames(
                                                        pathname.endsWith(item.href)
                                                            ? 'bg-gray-50 text-primary'
                                                            : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )
                                                }
                                            >
                                                <item.icon
                                                    className={
                                                        classNames(
                                                            pathname.endsWith(item.href) ? 'text-primary' : 'text-gray-400 group-hover:text-primary',
                                                            'h-6 w-6 shrink-0'
                                                        )
                                                    }
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        </li>)}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="lg:pl-72">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="relative flex flex-1">
                            <MagnifyingGlassIcon
                                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            <input
                                id="search-field"
                                className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                placeholder="Search..."
                                type="search"
                                name="search"
                            />
                        </div>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

                            <Dropdown
                                className="flex items-center"
                                navigation={[
                                    { name: 'Account', href: '/dashboard/account' }
                                ]}
                            >
                                {status == 'loading'
                                    ? <Loading type="avatar" />
                                    : (
                                        <Image
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                            src={gravatar(session?.user?.email ?? '')}
                                            width={80}
                                            height={80}
                                            alt=""
                                        />)}
                            </Dropdown>
                        </div>
                    </div>
                </div>

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
