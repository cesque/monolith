import Head from 'next/head'
import '../styles/globals.scss'
import '../styles/ghost.scss'

export default function MyApp({ Component, pageProps }) {
    return <>
        <Head>
            <link rel="stylesheet" href="https://use.typekit.net/iuc5xfk.css" />
            getMetaData()
        </Head>

        <Component {...pageProps} />
    </>
}
