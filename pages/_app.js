import Head from 'next/head'
import '../styles/globals.scss'
import '../styles/ghost.scss'

export default function MyApp({ Component, pageProps }) {
    return <>
        <Head>
            <link rel="stylesheet" href="https://use.typekit.net/iuc5xfk.css" />
            <meta property="og:description" content="monolith ⏵ a blog/wiki/knowledge-base/thought-dump by cesque" />
            <meta name="theme-color" content="#000000" />
        </Head>

        <Component {...pageProps} />
    </>
}
