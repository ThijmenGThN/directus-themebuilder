import Head from 'next/head'
import { Directus } from '@directus/sdk'

import type { AppProps } from 'next/app'

import '/source/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {

  pageProps.API = new Directus(process.env.DIRECTUS_ENDPOINT || "http://127.0.0.1:8055")

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
