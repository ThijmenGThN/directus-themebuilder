import Head from 'next/head'
import getConfig from 'next/config'
import { Directus } from '@directus/sdk'

import '@/styles/globals.css'

const { publicRuntimeConfig: config } = getConfig()

export default function App({ Component, pageProps }: any) {

  pageProps.API = new Directus(config.CORS_ENDPOINT ? config.CORS_ENDPOINT : 'http://localhost:8055')

  return (
    <>
      <Head>
        <title>Theme Builder - Directus</title>
        <link rel="icon" href="/favicon.ico" />

        <meta content="Theme Builder" property="og:title" />
        <meta content="A Theme Builder for Directus" property="og:description" />
        <meta content="https://themebuilder.thijmenheuvelink.nl" property="og:url" />
        <meta content="https://i.imgur.com/xUqSnkA.png" property="og:image" />
        <meta content="#6644FF" data-react-helmet="true" name="theme-color" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}
