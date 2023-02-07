
export default function People({ hex, people, title }: { hex: string, people: any, title: string }) {
    // Dynamically change the theme based on the hex.
    const borderHover = {
        in: (obj: any) => obj.style.borderColor = hex,
        out: (obj: any) => obj.style.borderColor = '#d4d4d4'
    }

    return (
        <div className='mt-10 flex flex-col gap-2 relative'>
            <p className='font-semibold'>{title}</p>
            <div className='flex flex-wrap gap-2 max-h-[512px] overflow-y-hidden'
                onMouseOver={({ target }) => borderHover.in(target)}
                onMouseOut={({ target }) => borderHover.out(target)}
            >
                {
                    people.map((person: any, index: number) => (
                        <a className='flex rounded-lg items-center gap-4 border-2 grow justify-center py-4 px-6 border-neutral-300'
                            key={index} href={person.html_url} target="_blank" rel="noreferrer"
                        >
                            <img className='pointer-events-none aspect-square w-10 rounded-full' src={person.avatar_url} alt="avatar" />
                            <p className='pointer-events-none font-semibold'>@{person.login}</p>
                        </a>
                    ))
                }
            </div>

            <div className={'bg-gradient-to-b from-transparent pointer-events-none via-transparent absolute top-0 left-0 h-full w-full ' + (people.length > 5 && 'to-white')} />
        </div>
    )
}
