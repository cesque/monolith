import Footer from '../components/Footer.js'
import Header from '../components/Header'
import { getPosts, getPost } from '../lib/posts'

import styles from '../styles/post.module.scss'

const elementsWithChildren = ['UL', 'OL']

export async function getStaticPaths(context) {
    let posts = await getPosts()

    let paths = posts.map(post => {
        return {
            params: {
                slug: post.slug,
            }
        }
    })

    return {
        paths,
        fallback: false,
    }
}

function getElements(post) {
    let elements = []

    let body = post.data.window.document.body
    for(let element of body.childNodes) {
        let parsed = getElement(element)

        if(parsed) {
            elements.push(parsed)
        } 
    }

    return elements
}

function getElement(element) {
    if(!element.tagName) {
        return null
    }
    let attributes = {}
    for(let attribute of [...element.attributes]) {
        attributes[attribute.name] = attribute.value
    }
    
    let children = []
    if(elementsWithChildren.includes(element.tagName)) {
        for(let child of element.childNodes) {
            children.push(getElement(child))
        }
    }

    return {
        tag: element.tagName.toLowerCase(),
        content: element.innerHTML,
        attributes,
        children,
    }
}

export async function getStaticProps(context) {
    const post = await getPost(context.params.slug)

    let elements = getElements(post)

    if (!post) {
        return {
            notFound: true,
        }
    }

    delete post.data

    return {
        props: {
            post,
            elements,
        },
    }
}

function renderElement(element, index) {
    let content = { '__html': element.content }
    let attributes = element.attributes
    if(attributes.class) {
        attributes.className = attributes.class
        delete attributes.class
    }

    let extractClasses = { 
        'kg-width-wide': 'wide',
        'kg-embed-card': 'embed',
    }

    let bubbledClasses = Object.keys(extractClasses).filter(key => {
        return attributes.className && attributes.className.includes(key)
    }).map(key => extractClasses[key])

    let output = null
    switch(element.tag) {
        case 'ol': output = <ol {...element.attributes}>
                { element.children.map(renderElement) }
            </ol>
            break
        case 'ul': output = <ul {...element.attributes}>
                { element.children.map(renderElement) }
            </ul>
            break
        case 'hr': output = <hr />
            break
        default:
            let Tag = element.tag
            output = <Tag  { ...element.attributes } dangerouslySetInnerHTML={ content } />
            break
    }

    return <div key={ index } className={ `element-container ${ element.tag } ${ bubbledClasses.join(' ') }` }>
        { output }
    </div>
}

export default function PostPage(props) {
    return <div className={ styles.container }>
        <Header post={ props.post } />
        <main className={ styles.post }>
            <header className={ styles.header }>
                <h2>{ props.post.title }</h2>
            </header>
            <section className={ `ghost-content ${styles.content}`}>
                { props.elements.map(renderElement) }
            </section>
        </main>
        <Footer post={ props.post } />
    </div>
}