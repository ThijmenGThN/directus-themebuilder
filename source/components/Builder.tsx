import { useEffect, useState } from "react"

import * as shade from '@/resources/shade'

export default function Builder() {
    const [hex, setHex] = useState<string>('#6644ff')
    const [palette, setPalette] = useState<Array<string>>([])
    const [object, setObject] = useState<string>('')
    const [copied, setCopied] = useState<boolean>(false)

    function appendColor(color: string) {
        let buffer = palette.slice(0)
        buffer.unshift(color)
        buffer.length > 10 && buffer.pop()
        setPalette(buffer)
    }

    function copy() {
        setCopied(true)
        navigator.clipboard.writeText(object)
        setTimeout(() => setCopied(false), 2500)
    }

    useEffect(() => {
        setObject(shade.wrap(hex))
    }, [hex])

    useEffect(() => setPalette(([...Array(10)].map(() => shade.random()))), [])

    return (
        <div className="mt-16 flow-root sm:mt-24">
            <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
                <div className="flex-1 xl:flex overflow-x-hidden">
                    <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
                        <div className="flex gap-2 overflow-x-hidden -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 xl:flex-col">
                            <div className='relative flex'>
                                <div className="flex items-center ring-1 ring-inset ring-gray-900/10 w-20 h-10 rounded xl:w-full"
                                    style={{ backgroundColor: hex }}
                                >
                                    <p className="text-center w-full uppercase font-bold" style={{ color: shade.contrast(hex, '#fff', '#000') }}>
                                        {hex.replace('#', '')}
                                    </p>
                                </div>

                                <input className='absolute top-0 left-0 w-full h-full opacity-0 hover:cursor-pointer'
                                    onBlur={(({ target }) => { setHex(target.value); appendColor(target.value) })}
                                    onChange={(({ target }) => setHex(target.value))}
                                    type="color"
                                />
                            </div>

                            <ul className="grid overflow-hidden gap-2 w-full h-10 grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-2 xl:h-auto">
                                {
                                    palette.map((color: string, index: number) => (
                                        <li key={index} className='rounded ring-1 h-10 ring-inset ring-gray-900/10 hover:cursor-pointer'
                                            style={{ backgroundColor: color }}
                                            onClick={() => setHex(color)}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                        <div className="flex gap-2 -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <div className="flex flex-col p-1 bg-white rounded-lg ring-1 ring-inset ring-gray-900/10">
                                <button className="group p-3 rounded" onClick={copy}>
                                    {
                                        copied
                                            ? (
                                                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={shade.contrast(hex, hex, '#000')}>
                                                    <path fill-rule="evenodd" d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5zm6.61 10.936a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                                                    <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                                                </svg>
                                            )
                                            : (
                                                <svg className="w-8 h-8 group-hover:scale-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A1.5 1.5 0 0113.5 3H15a1.5 1.5 0 011.5 1.5H12z" clip-rule="evenodd" />
                                                    <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 019 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0116.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625v-12z" />
                                                    <path d="M10.5 10.5a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963 5.23 5.23 0 00-3.434-1.279h-1.875a.375.375 0 01-.375-.375V10.5z" />
                                                </svg>
                                            )
                                    }
                                </button>
                            </div>

                            <div className="p-2 bg-white rounded-lg w-full ring-1 ring-inset ring-gray-900/10">
                                <p className='font-semibold whitespace-pre-wrap' style={{ color: shade.contrast(hex, hex, '#000') }}>
                                    {object}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
