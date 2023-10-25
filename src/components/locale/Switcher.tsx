"use client"

import { Fragment } from 'react'
import Link from 'next-intl/link'
import { useLocale } from 'next-intl'
import { usePathname } from 'next-intl/client'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'

import { classNames } from '@/helpers/tailwind'

const locales = [
    'en',
    'nl'
]

export default function Component() {
    const locale = useLocale()
    const pathname = usePathname()

    return (
        <Listbox value={locale}>
            {
                ({ open }) =>
                    <div className="relative">
                        <Listbox.Button className="relative w-full truncate cursor-default rounded-md bg-white py-1.5 px-4 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 hover:cursor-pointer">
                            {locale.toUpperCase()}
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 right-0 mt-1 max-h-60 w-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {
                                    locales.map((lang, index) => (
                                        <Link href={pathname} locale={lang} key={index}>
                                            <Listbox.Option
                                                className={
                                                    ({ active }) => classNames(
                                                        active ? 'bg-primary text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-8 pr-4 hover:cursor-pointer'
                                                    )
                                                }
                                                value={lang}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {lang.toUpperCase()}
                                                        </span>

                                                        {
                                                            selected
                                                                ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-primary',
                                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                )
                                                                : null
                                                        }
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        </Link>
                                    ))
                                }
                            </Listbox.Options>
                        </Transition>
                    </div>
            }
        </Listbox>
    )
}
