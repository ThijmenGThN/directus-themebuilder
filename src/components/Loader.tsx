
type iTypes = 'input' | 'avatar'

export default function Component({ type, override }: { type: iTypes, override?: string }) {

    switch (type) {
        case 'input':
            return <div className={"bg-gray-200 animate-pulse rounded-md " + (override ?? 'w-full h-9')} />
        case 'avatar':
            return <div className={'rounded-full bg-gray-200 animate-pulse ' + (override ?? 'h-8 w-8')} />
    }
}
