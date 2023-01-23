import { useState } from 'react'

import { BiCopy } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa'


export default function Content({ content, hex }: { content: string, hex: string }) {
    const [copied, setCopied] = useState(false)

    // Dynamically change the theme based on the hex.
    const borderHover = {
        in: (obj: any) => obj.style.borderColor = hex,
        out: (obj: any) => obj.style.borderColor = '#d4d4d4'
    }

    return (
        <div className='mt-10 flex flex-col gap-2'>
            <p className='font-semibold'>Custom CSS</p>
            <div className='flex min-h-[502px] relative overflow-hidden rounded-lg border-2 border-neutral-300 hover:border-3' onMouseOver={({ target }) => borderHover.in(target)} onMouseOut={({ target }) => borderHover.out(target)}>
                <div className='bg-slate-100 w-14 border-r-2 pointer-events-none'></div>
                <textarea readOnly className='w-full font-semibold outline-0 resize-none p-2 pointer-events-none' style={{ color: hex }} value={content} />
                {
                    copied ? (
                        <button className='absolute top-4 right-4 bg-slate-100 p-3 hover:bg-slate-200 rounded m-1.5 border-2' style={{ color: hex, borderColor: hex }}>
                            <FaCheck className="pointer-events-none" />
                        </button>
                    ) : (
                        <button onClick={() => { navigator.clipboard.writeText(content); setCopied(true); setTimeout(() => setCopied(false), 2500) }} className='absolute top-4 right-4 bg-slate-100 p-3 rounded m-1.5 border-2 hover:bg-slate-200'>
                            <BiCopy className="pointer-events-none" />
                        </button>
                    )
                }
            </div>
        </div>
    )
}
