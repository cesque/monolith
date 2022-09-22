import Link from 'next/link'
import React from 'react'
import mainStyles from '../styles/game.module.scss'
import plainStyles from '../styles/plain/game.module.scss'

export default class Game extends React.Component {
    getImageURL() {
        if(this.props.imageOverride) return this.props.imageOverride

        return `https://cdn.cloudflare.steamstatic.com/steam/apps/${ this.props.id }/header_292x136.jpg`
    }

    render() {
        let styles = process.env.THEME == 'plain' ? plainStyles : mainStyles

        let Tag = this.props.isInList ? 'li' : 'div'

        return <Tag className={ styles.game }>
            <a className={ styles.link } href={ this.props.link }>
                <img className={ styles.image } src={ this.getImageURL() } />

                <div className={ styles.content }>
                    <h3 className={ styles.name }>{ this.props.name }</h3>
                    <p className={ styles.description }>{ this.props.description }</p>
                </div>
            </a>
        </Tag>
    }
}