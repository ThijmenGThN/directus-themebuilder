import Head from 'next/head'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: any) {

  return (
    <>
      <Head>
        <title>Theme Builder - Directus</title>

        <meta content="Theme Builder" property="og:title" />
        <meta content="Transform Directus with a splash of color, streamlined for effortless use." property="og:description" />
        <meta content="https://themebuilder.thijmenheuvelink.nl" property="og:url" />
        
        <meta content="https://i.imgur.com/bmYd1T4.png" property="og:image" />

        <meta content="#6644FF" data-react-helmet="true" name="theme-color" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}
