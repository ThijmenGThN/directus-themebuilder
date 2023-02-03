import { useEffect, useState } from 'react'
import { execSync } from 'child_process'
import axios from 'axios'

import { BiStar } from 'react-icons/bi'

import * as shade from '@/resources/shade'

import Footer from '@/components/Footer'
import Splash from '@/components/Splash'
import Content from '@/components/Content'

export default function Index({ git, contributors, stargazers }: any) {
  const [hex, setHex] = useState('#6644FF')
  const [hexText, setHexText] = useState('#6644FF')
  const [content, setContent] = useState('')

  // Dynamically change the theme based on the hex.
  const borderHover = {
    in: (obj: any) => obj.style.borderColor = hex,
    out: (obj: any) => obj.style.borderColor = '#d4d4d4'
  }

  useEffect(() => {
    // Ensure hex starts with a "#".
    !hex.startsWith('#') && setHex('#' + hex)

    // Ensures that any given hex color can be seen infront of a white background.
    // -->> Implementation by https://github.com/vanling - Thanks!
    setHexText(shade.contrast(hex, hex, '#a3a3a3'))

    // Update the css object.
    setContent(shade.wrap(hex))
  }, [hex])

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="container mx-auto flex flex-col px-5 grow mb-10">
        {/* ----- SECTION: Interface ----- */}
        <Splash hex={hex} />

        <div className='mt-10 flex flex-col gap-2 mx-auto'>
          <p className='font-semibold'>
            Color Palette
          </p>

          <div className='flex gap-2'>
            <div className='border-2 border-neutral-300 rounded-lg overflow-hidden'>
              <input type="color"
                value={hex}
                onChange={(({ target }) => console.log(target.value))}
              />
            </div>

            <a href="https://github.com/ThijmenGThN/directus-themebuilder/stargazers" target="_blank" rel="noreferrer"
              className='bg-white border-neutral-300 border-2 items-center rounded-lg flex gap-3 text-xl my-auto px-6 py-4 hover:cursor-pointer hover:border-violet-500 hover:border-3'
              onMouseOver={({ target }) => borderHover.in(target)}
              onMouseOut={({ target }) => borderHover.out(target)}
            >
              <BiStar className='pointer-events-none' />
              <p className='pointer-events-none'>{stargazers.count}</p>
            </a>
          </div>
        </div>

        {/* ----- SECTION: Custom CSS ----- */}
        <Content hex={hex} hexText={hexText} content={content} />

        {/* ----- SECTION: Contributors ----- */}
        <div className='mt-10 flex flex-col gap-2'>
          <p className='font-semibold'>Contributors</p>
          <div className='flex flex-wrap gap-2 max-h-[512px] overflow-y-hidden'
            onMouseOver={({ target }) => borderHover.in(target)}
            onMouseOut={({ target }) => borderHover.out(target)}
          >
            {
              contributors.people.map((gazer: any, index: number) => (
                <a className='flex rounded-lg items-center gap-4 border-2 grow justify-center py-4 px-6 border-neutral-300 hover:border-3'
                  key={index} href={gazer.html_url} target="_blank" rel="noreferrer"
                >
                  <img className='pointer-events-none aspect-square w-10 rounded-full' src={gazer.avatar_url} alt="avatar" />
                  <p className='pointer-events-none font-semibold'>@{gazer.login}</p>
                </a>
              ))
            }
          </div>
        </div>

        {/* ----- SECTION: Stargazers ----- */}
        <div className='mt-10 flex flex-col gap-2 relative'>
          <p className='font-semibold'>Stargazers</p>
          <div className='flex flex-wrap gap-2 max-h-[512px] overflow-y-hidden'
            onMouseOver={({ target }) => borderHover.in(target)}
            onMouseOut={({ target }) => borderHover.out(target)}
          >
            {
              stargazers.people.map((gazer: any, index: number) => (
                <a className='flex rounded-lg items-center gap-4 border-2 grow justify-center py-4 px-6 border-neutral-300 hover:border-3'
                  key={index} href={gazer.html_url} target="_blank" rel="noreferrer"
                >
                  <img className='pointer-events-none aspect-square w-10 rounded-full' src={gazer.avatar_url} alt="avatar" />
                  <p className='pointer-events-none font-semibold'>@{gazer.login}</p>
                </a>
              ))
            }
          </div>

          <div className='bg-gradient-to-b from-transparent pointer-events-none via-transparent absolute top-0 left-0 to-white h-full w-full' />
        </div>
      </div>

      <Footer git={git} hex={hex} />
    </div >
  )
}

export async function getServerSideProps() {
  let props: any = {
    git: {
      buildId: execSync('git rev-parse --short HEAD').toString(),
      latestTag: execSync('git describe --abbrev=0 --tags').toString()
    }
  }

  try {
    props['contributors'] = {
      people: (await axios.get('https://api.github.com/repos/ThijmenGThN/directus-themebuilder/contributors')).data.filter(({ login }: { login: string }) => login != "ThijmenGThN")
    }

    props['stargazers'] = {
      count: (await axios.get('https://api.github.com/repos/ThijmenGThN/directus-themebuilder')).data.stargazers_count,
      people: (await axios.get('https://api.github.com/repos/ThijmenGThN/directus-themebuilder/stargazers')).data.filter(({ login }: { login: string }) => login != "ThijmenGThN").reverse()
    }
  } catch (error) {
    props['contributors'] = {
      people: [{ avatar_url: '/defaults/user.png', login: ' Failed to load..' }]
    }

    props['stargazers'] = {
      count: 0,
      people: [{ avatar_url: '/defaults/user.png', login: ' Failed to load..' }]
    }
  }

  return { props }
}
