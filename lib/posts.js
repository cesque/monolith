import GhostContentAPI from "@tryghost/content-api"

const jsdom = require('jsdom')
const { JSDOM } = jsdom

// Create API instance with site credentials
const api = new GhostContentAPI({
    url: 'http://localhost:2368',
    key: '7e91cc394c864747b59cf7f89d',
    version: 'v4',
})

export async function getPosts() {
    return await api.posts
        .browse({ limit: 'all' })
        .catch(err => console.error(err))
}

export async function getPost(slug) {
    let post = await api.posts
        .read({ slug })
        .catch(err => console.error(err))

    return {
        ...post,
        data: new JSDOM(post.html)
    }
}