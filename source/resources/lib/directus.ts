
import getConfig from "next/config"
import { Directus } from "@directus/sdk"

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()
const { CORS_ENDPOINT } = publicRuntimeConfig
const { STATIC_TOKEN } = serverRuntimeConfig

interface Options {
    useAdmin?: boolean
    auth?: {
        email: string
        password: string
    }
}

export default async function (options?: Options) {

    // Construct Directus client
    const SDK = new Directus<any>(
        CORS_ENDPOINT
            ? CORS_ENDPOINT
            : 'http://localhost:8055'
    )

    if (options?.useAdmin) await SDK.auth.static(STATIC_TOKEN)
    else if (options?.auth) await SDK.auth.login(options.auth)

    return SDK
}

