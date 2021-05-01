import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/home.module.scss'

import { getPosts } from '../lib/posts'

export async function getStaticProps(context) {
    let posts = await getPosts()

    return {
        props: {
            posts,
        },
    }
}

export default function Home(props) {
    return (
        <div className={ styles.container }>
            <Head>
                <title>monolith</title>
                {/* <meta name="description" content="Generated by create next app" /> */}
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={ styles.main }>
                {props.posts.map(post => {
                    return <Link key={ post.uuid } href={`/${post.slug}`}>
                        <a className={ styles.postLink }>{ post.title }</a>
                    </Link>
                })}
            </main>
        </div>
    )
}
