import { useEffect, useState } from 'react'
import { execSync } from 'child_process'
import axios from 'axios'

import { BsPlusLg, BsStars } from 'react-icons/bs'

import * as shade from '@/resources/shade'

import Footer from '@/components/Footer'
import Splash from '@/components/Splash'
import Content from '@/components/Content'
import People from '@/components/People'

interface GitData {
  latestTag: string
  buildId: string
}

interface Person {
  login: string
  html_url: string
  avatar_url: string
}

export default function Index({ git }: { git: GitData }) {
  const [hex, setHex] = useState<string>('#6644FF')
  const [hexText, setHexText] = useState<string>('#6644FF')
  const [content, setContent] = useState<string>('')
  const [showPickerNotice, setShowPickerNotice] = useState<boolean>(true)
  const [palette, setPalette] = useState<Array<string>>([shade.random(), shade.random(), shade.random()])

  const [contributors, setContributors] = useState<Array<Person>>([])
  const [stargazers, setStargazers] = useState<Array<Person>>([])

  // Dynamically changes the theme based on the hex.
  const borderHover = {
    in: (obj: any) => obj.style.borderColor = hex,
    out: (obj: any) => obj.style.borderColor = '#d4d4d4'
  }

  // Fetches people from GitHub to later be displayed on the page.
  const pullPeople = async (type: 'contributors' | 'stargazers') => {
    const res = await axios.get('https://api.github.com/repos/ThijmenGThN/directus-themebuilder/' + type)

    // Let's get rid of the repo owner ;) - Filters out by login (GitHub username) and returns the list of people.
    return res.data.filter(({ login }: { login: string }) => login != "ThijmenGThN").reverse()
  }

  useEffect(() => {
    // Ensure hex starts with a "#".
    !hex.startsWith('#') && setHex('#' + hex)

    // Ensures that any given hex color can be seen infront of a white background.
    // -->> Implemented by https://github.com/vanling - Thanks!
    setHexText(shade.contrast(hex, hex, '#a3a3a3'))

    // Update the css object.
    setContent(shade.wrap(hex))
  }, [hex])

  useEffect(() => {
    // Fetch people from GitHub.
    pullPeople('contributors').then((people: Array<Person>) => setContributors(people))
    pullPeople('stargazers').then((people: Array<Person>) => setStargazers(people))
  }, [])

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="container mx-auto flex flex-col px-5 grow mb-10">

        {/* ----- Logo with Motto ----- */}
        <Splash hex={hexText} />

        {/* ----- Palette ----- */}
        <div className='flex gap-2 mt-10 mx-auto'>
          <div id="palette-picker" className='border-2 relative border-neutral-300 rounded-lg'>
            <input id="color-picker" className='absolute top-0 left-0 w-full h-full opacity-0 hover:cursor-pointer'
              onChange={(({ target }) => setHex(target.value))}
              value={hex}
              type="color"
              onClick={() => setShowPickerNotice(false)}
              onMouseOver={() => borderHover.in(document.querySelector('#palette-picker'))}
              onMouseOut={() => borderHover.out(document.querySelector('#palette-picker'))}
            />

            <div className='m-3 w-9 h-9 rounded pointer-events-none' style={{ backgroundColor: hex }} />

            {/* Alert that shows the possibility to use your own custom color. */}
            <div className={"absolute top-[-1.85rem] z-0 left-6 w-44 h-6 p-0.5 rounded transition-transform duration-500 opacity-0 " + (showPickerNotice && " opacity-100")}
              style={{ backgroundColor: hexText }}
            >
              <p className='italic text-center text-white text-sm font-mono'>use your own color</p>
              <div className='absolute -z-10 -bottom-1.5 left-2 w-4 h-4 animate-ping rounded-full' style={{ backgroundColor: hexText }}></div>
              <div className='absolute -z-10 -bottom-1.5 left-2 w-4 h-4 rotate-45 rounded' style={{ backgroundColor: hexText }}></div>
            </div>
          </div>

          <div id="palette-prefabs" className='border-2 p-3 border-neutral-300 grid grid-flow-col gap-2 rounded-lg'
            onMouseOver={({ target }) => borderHover.in(target)}
            onMouseOut={({ target }) => borderHover.out(target)}
          >
            {/* Display the 3 randomized colors for the pallette on-screen. */}
            {
              palette.map((color: string, index: number) => (
                <div key={index} className='rounded w-9 h-9 hover:cursor-pointer flex justify-center items-center text-white'
                  style={{ backgroundColor: color }}
                  onClick={() => { setHex(color); setPalette([shade.random(), shade.random(), shade.random()]) }}
                  onMouseOver={() => borderHover.in(document.querySelector('#palette-prefabs'))}
                  onMouseOut={() => borderHover.out(document.querySelector('#palette-prefabs'))}
                >
                  <BsPlusLg />
                </div>
              ))
            }
          </div>

          <a href="https://github.com/ThijmenGThN/directus-themebuilder/stargazers" target="_blank" rel="noreferrer"
            className='bg-white border-neutral-300 border-2 items-center rounded-lg flex gap-1 text-xl my-auto p-4 hover:cursor-pointer hover:border-violet-500'
            onMouseOver={({ target }) => borderHover.in(target)}
            onMouseOut={({ target }) => borderHover.out(target)}
          >
            <BsStars className='pointer-events-none' />
            <p className='pointer-events-none font-semibold'>{stargazers.length + 1}</p>
          </a>
        </div>

        {/* ----- Custom CSS ----- */}
        <Content hex={hex} hexText={hexText} content={content} />

        {/* ----- Contributors ----- */}
        <People hex={hex} people={contributors} title="Contributors" />

        {/* ----- Stargazers ----- */}
        <People hex={hex} people={stargazers} title="Stargazers" />

      </div>

      <Footer git={git} hex={hexText} />
    </div >
  )
}

export async function getServerSideProps() {
  return {
    props: {
      git: {
        buildId: execSync('git rev-parse --short HEAD').toString(),
        latestTag: execSync('git describe --abbrev=0 --tags').toString()
      }
    }
  }
}
