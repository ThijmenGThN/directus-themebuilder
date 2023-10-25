"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { HTMLInputTypeAttribute, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { classNames } from "@/helpers/tailwind"

import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { useTranslations } from "next-intl"

type iFieldIds = 'name' | 'email' | 'password' | 'repeatPassword'
type iOptionIds = 'showPassword'

interface iForm {
    onSubmit: any
    validator: any
    description?: string
    submit: {
        label: string
        position?: 'left' | 'right' | 'full'
    }
    cancel?: {
        label: string
        redirect: string
    }
    fields: Array<{
        id: iFieldIds
        type: HTMLInputTypeAttribute
        label: string
        value?: string
        autoComplete?: string
    }>
    options?: Array<'showPassword'>
}

interface iField {
    id: iFieldIds
    type: HTMLInputTypeAttribute
    label: string
    value?: string
    autoComplete?: string
    register: Function
    showPassword?: boolean
    errors: any
    errorMessage: string | undefined
}

interface iOption {
    id: iOptionIds
    showPassword: boolean
    setShowPassword: Function
}

export default function Form(props: iForm) {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(props.validator) })

    const [isPending, setIsPending] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [showPassword, setShowPassword] = useState<boolean>(false)

    async function onSubmit(data: unknown) {
        setIsPending(true)
        if (isPending) return

        const res = await props.onSubmit(data)
        if (res instanceof Error) setErrorMessage(res.message)

        setIsPending(false)
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className="space-y-6">
                    {props.fields.map((field, index) =>
                        <Field
                            key={index}
                            label={field.label}
                            id={field.id}
                            type={field.type}
                            value={field.value}
                            autoComplete={field.autoComplete}
                            register={register}
                            errors={errors}
                            errorMessage={errorMessage}
                            showPassword={showPassword}
                        />
                    )}
                </div>

                {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}

                {props.description && <p className="mt-3 text-xs leading-6 text-gray-600">{props.description}</p>}
            </div>

            {props.options && props.options.map((option, index) => (
                <Options
                    key={index}
                    id={option}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />))}

            <div className="flex">
                <div className={classNames(
                    'items-center flex gap-5',
                    (!props.submit.position || props.submit.position == 'left') && 'flex-row-reverse',
                    props.submit.position == 'right' && 'ml-auto',
                    props.submit.position == 'full' && 'flex-col-reverse w-full',
                )}>
                    {props.cancel && (
                        <Link className="text-sm text-center font-semibold leading-6 text-gray-900"
                            href={props.cancel?.redirect}
                        >
                            {props.cancel.label}
                        </Link>)}

                    <button className={classNames(
                        "flex gap-x-2 items-center justify-center rounded-md bg-primary px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                        props.submit.position == 'full' && 'w-full'
                    )}
                        type="submit"
                    >
                        {isPending && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 animate-spin">
                                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                            </svg>)}

                        {props.submit.label}
                    </button>
                </div>
            </div>
        </form>
    )
}

function Field(props: iField) {

    return (
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {props.label}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input className={
                    props.errors[props.id]?.message || props.errorMessage
                        ? "block w-full rounded-md border-0 px-2 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                }
                    {...props.register(props.id, { required: true })}
                    type={
                        props.type == 'password'
                            ? props.showPassword ? 'text' : 'password'
                            : props.type
                    }
                    defaultValue={props.value}
                    autoComplete={props.autoComplete}
                />

                {props.errors[props.id]?.message && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>)}
            </div>

            {props.errors[props.id]?.message && (
                <p className="mt-2 text-sm text-red-600">
                    {props.errors[props.id]?.message.toString()}
                </p>)}
        </div>
    )
}

function Options(props: iOption) {
    const t = useTranslations('auth')

    switch (props.id) {

        case 'showPassword':
            return (
                <div className="flex items-center mt-5">
                    <input onClick={() => props.setShowPassword(!props.showPassword)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary hover:cursor-pointer"
                        id="showPassword"
                        type="checkbox"
                    />
                    <label htmlFor="showPassword" className="ml-3 block text-sm leading-6 text-gray-900 hover:cursor-pointer">
                        {t('show-password')}
                    </label>
                </div>
            )

    }
}
