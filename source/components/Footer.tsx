import { RiPaypalFill, RiGitRepositoryFill } from 'react-icons/ri'
import { BiCopyright } from 'react-icons/bi'

export default function Footer({ git, hex }: { git: any, hex: string }) {

    return (
        <div className='w-full bg-slate-200'>
            <div className='container mx-auto flex text-sm px-1 text-neutral-800 font-semibold'>
                <a className='gap-2 flex hover:cursor-pointer rounded-lg hover:bg-slate-300 my-2 mr-auto p-4' href="mailto:themebuilder@thijmenheuvelink.nl">
                    {new Date().getFullYear()}
                    <div className='mt-[3px]'>
                        <BiCopyright />
                    </div>
                    Theme Builder
                </a>

                <a className='rounded-lg hover:bg-slate-300 px-4 my-2 text-xl items-center gap-2 hover:cursor-pointer flex' rel="noreferrer" target="_blank" href="https://github.com/ThijmenGThN/directus-themebuilder">
                    <div className='text-xs font-mono flex flex-col text-right mr-1'>
                        <p>{git.latestTag}</p>
                        <p style={{ color: hex }}>{git.buildId}</p>
                    </div>
                    <RiGitRepositoryFill />
                </a>
                <a className='rounded-lg hover:bg-slate-300 p-4 my-2 text-xl hover:cursor-pointer' rel="noreferrer" target="_blank" href="https://paypal.me/ThijmenGThN">
                    <RiPaypalFill />
                </a>
            </div>
        </div>
    )
}
