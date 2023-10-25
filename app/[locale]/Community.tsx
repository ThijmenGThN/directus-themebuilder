import { useEffect, useState } from 'react'

interface Person {
    login: string
    html_url: string
    avatar_url: string
}

export default function Community() {
    const [contributors, setContributors] = useState<Array<Person>>([])
    const [stargazers, setStargazers] = useState<Array<Person>>([])

    // Fetches people from GitHub to later be displayed on the page.
    const pullPeople = async (type: 'contributors' | 'stargazers') => await (await fetch('https://api.github.com/repos/ThijmenGThN/directus-themebuilder/' + type)).json()

    useEffect(() => {
        // Fetch people from GitHub.
        pullPeople('contributors').then((people: Array<Person>) => setContributors(people))
        pullPeople('stargazers').then((people: Array<Person>) => setStargazers(people.reverse()))
    }, [])

    return (
        <section className="pt-24 sm:pt-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
                        <div className="py-6">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                <div className="mx-auto max-w-2xl lg:mx-0">
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contributors</h2>
                                    <p className="mt-6 text-lg leading-8 text-gray-600">
                                        The peeps who built and maintain this project.
                                    </p>
                                </div>

                                <ul role="list" className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 h-10">
                                    {contributors.map((person) => (
                                        <li key={person.login}>
                                            <a href={person.html_url} target='_blank' rel="noreferrer">
                                                <div className="flex items-center gap-x-6">
                                                    <img className="h-10 w-10 rounded-full" src={person.avatar_url} alt="" />
                                                    <div>
                                                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.login}</h3>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
                        <div className="py-6">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                <div className="mx-auto max-w-2xl lg:mx-0">
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Stargazers</h2>
                                    <p className="mt-6 text-lg leading-8 text-gray-600">
                                        Our amazing folk who bring this project to life.
                                    </p>
                                </div>

                                <ul className="flex isolate -space-x-2 overflow-hidden mt-6 h-8">
                                    {stargazers.slice(0, 8).map((person) => (
                                        <li key={person.login}>
                                            <a href={person.html_url} target="_blank" rel="noreferrer">
                                                <img
                                                    className="relative z-30 inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                                    src={person.avatar_url}
                                                    alt=""
                                                />
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className='mt-6'>
                                    <a href="https://github.com/ThijmenGThN/directus-themebuilder" className="italic text-sm font-semibold leading-6 text-gray-900">
                                        See {stargazers.length - 8} other people <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
