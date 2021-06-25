import Link from 'next/link'
import React from 'react'
import styles from '../styles/footer.module.scss'
import { DateTime } from 'luxon'

export default class Footer extends React.Component {
    constructor(props) {
        super(props)

        this.separator = '—'
    }

    formatDate(date) {
        return date.toFormat(`yyyy-LL-dd'T'HH:mm:ss`)
    }

    getPublished() {
        if(!this.props.post) return null

        let isDraft = this.props.post.status == 'draft'

        let published = DateTime.fromISO(this.props.post.published_at)
        let updated = DateTime.fromISO(this.props.post.updated_at)

        return <div className={ `${styles.row} ${styles.rowDates }` }>
            <div className={ styles.published }>
                pub{`{`}<b>{ isDraft ? 'draft' : this.formatDate(published) }</b>{`}`}
            </div>
            { (isDraft || (updated > published)) && <>
                    <div className={ styles.separator }>{ this.separator }</div>
                    <div className={ styles.updated }>
                        upd{`{`}<b>{ this.formatDate(updated) }</b>{`}`}
                    </div>
                </>
            }
        </div>
    }

    getPostID() {
        if(!this.props.post) return null

        return <>
            <div className={ styles.separator }>{ this.separator }</div>
            <div className={ styles.postID }>
                { this.props.post.id }/{ this.props.post.slug }
            </div>
        </>
    }
    
    render() {
        let symbols = '⏵█◆●▨◼⚊◪▼▲◈⬣⬢'
        let separator = symbols[Math.floor(Math.random() * symbols.length)]

        return <footer className={ styles.footer }>
            <div className={ styles.inner }>
                { this.getPublished() }
                
                <div className={ `${styles.row } ${ styles.rowCopyright }` }>
                    <div className={ styles.copyright}>
                        © <a href="https://twitter.com/cesque">cesque</a> { new Date().getFullYear() }
                    </div>
                    { this.getPostID() }
                </div>
            </div>
        </footer>
    }
}