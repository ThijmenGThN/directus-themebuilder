import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BiCopy, BiCopyright } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa'
import { RiPaypalFill, RiGitRepositoryFill } from 'react-icons/ri'

import Banner from "/public/favicon.ico"

function shade(color: string, percent: number) {
  var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

export default function Index() {
  const [copied, setCopied] = useState(false)
  const [hex, setHex] = useState('#6644FF')
  const [content, setContent] = useState(`
#app, #main-content, body {
  --primary-alt: #F0ECFF !important;
  --primary-10: #F0ECFF !important;
  --primary-25: #D9D0FF !important;
  --primary-50: #B3A1FF !important;
  --primary-75: #8C73FF !important;
  --primary-90: #7557FF !important;

  --primary: #6644FF !important;

  --primary-110: #5E41EC !important;
  --primary-125: #523DCF !important;
  --primary-150: #3E369F !important;
  --primary-175: #2B3070 !important;
  --primary-190: #1F2C53 !important;

  --v-button-background-color: #6644FF !important;
  --v-button-background-color-hover: #5E41EC !important;
  --sidebar-detail-color-active: #5E41EC !important;
}
  `.trim())

  useEffect(() => {
    !hex.startsWith('#') && setHex('#' + hex)

    setContent(`
#app, #main-content, body {
  --primary-alt: ${shade(hex, 0.90)} !important;
  --primary-10: ${shade(hex, 0.90)} !important;
  --primary-25: ${shade(hex, 0.75)} !important;
  --primary-50: ${shade(hex, 0.50)} !important;
  --primary-75: ${shade(hex, 0.25)} !important;
  --primary-90: ${shade(hex, 0.10)} !important;

  --primary: ${shade(hex, 0)} !important;

  --primary-110: ${shade(hex, -0.90)} !important;
  --primary-125: ${shade(hex, -0.75)} !important;
  --primary-150: ${shade(hex, -0.50)} !important;
  --primary-175: ${shade(hex, -0.25)} !important;
  --primary-190: ${shade(hex, -0.10)} !important;

  --v-button-background-color: ${shade(hex, 0)} !important;
  --v-button-background-color-hover: ${shade(hex, -0.90)} !important;
  --sidebar-detail-color-active: ${shade(hex, -0.90)} !important;
}
    `.trim())
  }, [hex])

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="container mx-auto px-5 grow mb-10">
        <div className="flex flex-col gap-3 mt-8 items-center font-bold">
          <Image src={Banner} className="w-24" alt="Directus" />
          Theme Builder
        </div>

        <div className='mt-10 flex flex-col gap-2'>
          <p className='font-semibold'>Hex Color</p>
          <input placeholder='#6644FF' value={hex} onChange={({ target }) => { setHex(target.value.trim()) }} className="p-4 font-semibold border-2 outline-0 border-neutral-300 rounded-lg w-full hover:border-violet-500 hover:border-3" />
        </div>

        <div className='mt-10 flex flex-col gap-2'>
          <p className='font-semibold'>Custom CSS</p>
          <div className='flex min-h-[502px] relative rounded border-2 border-neutral-300 hover:border-violet-500 hover:border-3'>
            <div className='bg-slate-100 w-14 border-r-2'></div>
            <textarea readOnly className='w-full font-semibold outline-0 resize-none p-2 text-violet-500' value={content} />
            {
              copied ? (
                <button className='absolute top-4 right-4 bg-violet-100 p-3 rounded m-1.5 border-2 text-violet-500 border-violet-500'>
                  <FaCheck />
                </button>
              ) : (
                <button onClick={() => { navigator.clipboard.writeText(content); setCopied(true); setTimeout(() => setCopied(false), 2500) }} className='absolute top-4 right-4 bg-slate-100 p-3 rounded m-1.5 border-2 hover:bg-slate-200'>
                  <BiCopy />
                </button>
              )
            }
          </div>
        </div>
      </div>

      <div className='w-full bg-slate-200'>
        <div className='container mx-auto flex text-sm px-1 text-neutral-800 font-semibold'>
          <a className='gap-2 flex hover:cursor-pointer mr-auto px-4 py-6' href="mailto:themebuilder@thijmenheuvelink.nl">
            {new Date().getFullYear()}
            <div className='mt-[3px]'>
              <BiCopyright />
            </div>
            Theme Builder
          </a>

          <a className='px-4 py-6 text-xl hover:cursor-pointer' rel="noreferrer" target="_blank" href="https://paypal.me/ThijmenGThN">
            <RiPaypalFill />
          </a>
          <a className='px-4 py-6 text-xl hover:cursor-pointer' rel="noreferrer" target="_blank" href="https://github.com/ThijmenGThN/directus-themebuilder">
            <RiGitRepositoryFill />
          </a>
        </div>
      </div>
    </div >
  )
}
