import React from 'react'
import Head from 'next/head'
import styles from '../styles/post.module.scss'
import gameRecommendationStyles from '../styles/game-recommendations.module.scss'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Game from '../components/Game'

import gamesList from '../data/games'
import { saveMetaImage } from '../lib/posts'
import config from '../lib/config'

export async function getStaticProps(context) {
    console.log(context)
    await saveMetaImage(`game-recommendations`)

    return {
        props: {
            post: {
                slug: 'game-recommendations',
                published_at: '2021-06-24T22:58:19.965Z',
                updated_at: new Date().toISOString(),
                id: '000000000000000000000000'
            }
        }
    }
}

export default class GameRecommendationsPage extends React.Component {
    render() {
        return <div className={ styles.container }>
            <Head>
                <title>monolith ⏵ game recommendations</title>
                {/* <meta name="description" content="Generated by create next app" /> */}
                <link rel="icon" href="/favicon.ico" />

                <meta property="og:title" content={ `monolith ⏵ game recommendations` } />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={ `${ config.url }thumbnails/game-recommendations.png` } />
                <meta property="og:description" content={ `monolith ⏵ game recommendations ⏵ by cesque` } />
            </Head>
        
            <Header post={ this.props.post } />

            <main className={ styles.post }>
                <header className={ styles.header }>
                    <h2>game recommendations</h2>
                </header>
                <section className={ styles.content }>
                    <div className={ gameRecommendationStyles.listContainer }>
                        <ul className={ gameRecommendationStyles.list }>
                            { gamesList.map(game => <Game key={ game.name } isInList="true" {...game} />) }
                        </ul>
                    </div>
                </section>
            </main>

            <Footer post={ this.props.post } />
        </div>
    }
}
