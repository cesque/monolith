import Link from 'next/link';
import React from 'react'
import styles from '../styles/header.module.scss'

export default class Header extends React.Component {
    render() {
        let symbols = '⏵█◆●▨◼⚊◪▼▲◈⬣⬢'
        let separator = symbols[Math.floor(Math.random() * symbols.length)]

        return <header className={ `${styles.header} ${ this.props.post ? styles.headerDeep : ''}` }>
                <h1>
                    <Link href="/" className={ styles.breadcrumb }><a className={ styles.name }>cesque</a></Link>
                    <Link href="/" className={ styles.breadcrumb }><a className={ styles.separator }>{ separator }</a></Link>
                    <Link href="/" className={ styles.breadcrumb }><a className={ styles.name }>monolith</a></Link>
                    { this.props.post && <div className={ styles.separator }>{ separator }</div> }
                    { this.props.post && <div className={ `${ styles.breadcrumb } ${ styles.name }` }>{ this.props.post.slug }</div> }
                </h1>
            </header>
    }

}