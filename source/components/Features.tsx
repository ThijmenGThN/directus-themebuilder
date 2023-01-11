import { FiExternalLink } from 'react-icons/fi'

const content = [{
    name: "Tailwind",
    color: "bg-cyan-500",
    link: "https://tailwindcss.com"
}, {
    name: "Directus",
    color: "bg-purple-500",
    link: "https://directus.io"
}, {
    name: "React Icons",
    color: "bg-pink-500",
    link: "https://react-icons.github.io/react-icons"
}]

export default function Features() {

    return (
        <div className="flex flex-col gap-6 mx-5 mt-10">
            <div>
                <p className="ml-2 font-bold">Included Features</p>
                <ul className="px-4 border-2 rounded-lg bg-neutral-100">
                    {
                        content.map((feature, key) => (
                            <li key={key} className={"flex gap-3 " + (key < content.length - 1 && "border-b-2")}>
                                <div className={"h-2 p-2 my-4 rounded-full aspect-square " + (feature.color)} />
                                <p className='my-3 grow'>{feature.name}</p>
                                <a href={feature.link} rel="noreferrer" target="_blank" className="p-1.5 my-2 border-2 rounded border-neutral-100 hover:border-neutral-200 hover:bg-white">
                                    <FiExternalLink />
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <a className='text-blue-500 mx-auto font-semibold' target="_blank" rel="norefferer" href="https://github.com/ThijmenGThN/bundles">ThijmenGThN/bundles (next-leaflet)</a>
        </div>
    )
}
