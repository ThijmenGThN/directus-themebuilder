import { MD5 } from 'crypto-js'

type iTypes = 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash'

export default function gravatar(email: string, type?: iTypes) {
    return `https://www.gravatar.com/avatar/${MD5(email.trim().toLowerCase())}?s=200&r=g&d=${type ?? 'identicon'}`
} 
