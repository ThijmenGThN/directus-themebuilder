import { useState } from 'react'

import { RiCheckboxCircleFill, RiClipboardFill } from 'react-icons/ri'

export default function Content({ content, hex, hexText }: { content: string, hex: string, hexText: string }) {
    const [copied, setCopied] = useState(false)

    // Dynamically change the theme based on the hex.
    const borderHover = {
        in: (obj: any) => obj.style.borderColor = hex,
        out: (obj: any) => obj.style.borderColor = '#d4d4d4'
    }

    // Write Custom CSS to clipboard of client, also visualize it being copied.
    const copy = () => {
        setCopied(true)
        navigator.clipboard.writeText(content)
        setTimeout(() => setCopied(false), 2500)
    }

    return (
        <div className='mt-10 flex flex-col gap-2'>
            <p className='font-semibold'>Custom CSS</p>

            <div className='flex gap-4 p-4 rounded-lg border-2 border-neutral-300'
                onMouseOver={({ target }) => borderHover.in(target)}
                onMouseOut={({ target }) => borderHover.out(target)}
            >
                {/* ----- Sidebar ----- */}
                <div className='flex flex-col gap-2'>
                    <button className='bg-slate-100 p-4 text-xl flex justify-center aspect-square rounded border-2 items-center'
                        style={copied ? ({ color: hex, borderColor: hex }) : undefined}
                        onClick={copy}
                    >
                        {copied ? <RiCheckboxCircleFill className="pointer-events-none" /> : <RiClipboardFill className="pointer-events-none" />}
                    </button>

                    <div className='bg-slate-100 grow rounded' />
                </div>

                <p className='w-full font-semibold resize-none pointer-events-none whitespace-pre-wrap' style={{ color: hexText }}>
                    {content}
                </p>
            </div>
        </div>
    )
}
