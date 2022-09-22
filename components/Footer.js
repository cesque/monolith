import Link from 'next/link'
import React from 'react'
import mainStyles from '../styles/footer.module.scss'
import plainStyles from '../styles/plain/footer.module.scss'
import { DateTime } from 'luxon'

export default class Footer extends React.Component {
    constructor(props) {
        super(props)

        this.separator = '—'

        this.styles = process.env.THEME == 'plain' ? plainStyles : mainStyles
    }

    formatDate(date) {
        return date.toFormat(`yyyy-LL-dd'T'HH:mm:ss`)
    }

    getPublished() {
        if(!this.props.post) return null

        let isDraft = this.props.post.status == 'draft'

        let published = DateTime.fromISO(this.props.post.published_at)
        let updated = DateTime.fromISO(this.props.post.updated_at)

        return <div className={ `${ this.styles.row } ${ this.styles.rowDates }` }>
            <div className={ this.styles.published }>
                pub{`{`}<b>{ isDraft ? 'draft' : this.formatDate(published) }</b>{`}`}
            </div>
            { (isDraft || (updated > published)) && <>
                    <div className={ this.styles.separator }>{ this.separator }</div>
                    <div className={ this.styles.updated }>
                        upd{`{`}<b>{ this.formatDate(updated) }</b>{`}`}
                    </div>
                </>
            }
        </div>
    }

    getPostID() {
        if(!this.props.post) return null

        return <>
            <div className={ this.styles.separator }>{ this.separator }</div>
            <div className={ this.styles.postID }>
                { this.props.post.id }/{ this.props.post.slug }
            </div>
        </>
    }
    
    render() {
        let symbols = '⏵█◆●▨◼⚊◪▼▲◈⬣⬢'
        let separator = symbols[Math.floor(Math.random() * symbols.length)]

        return <footer className={ this.styles.footer }>
            <div className={ this.styles.inner }>
                { this.getPublished() }
                
                <div className={ `${this.styles.row } ${ this.styles.rowCopyright }` }>
                    <div className={ this.styles.copyright}>
                        © <a href="https://twitter.com/cesque">cesque</a> { new Date().getFullYear() }
                    </div>
                    { this.getPostID() }
                </div>
            </div>
        </footer>
    }
}