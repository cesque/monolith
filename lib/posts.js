import GhostContentAPI from "@tryghost/content-api"
import GhostAdminAPI from "@tryghost/admin-api"

const jsdom = require('jsdom')
const { JSDOM } = jsdom

const apiURL = 'https://monolith.cesque.dev'
// Create API instance with site credentials
const api = new GhostContentAPI({
    url: apiURL,
    key: '535dc124ff4ad804bb7cd1cc81',
    version: 'v4',
})

const adminApi = new GhostAdminAPI({
    url: apiURL,
    key: '608dc5b83b90220cd9a32f89:a4b090a16690e51d8c345f5e1a0167acbc3d5a0e19a08ca71c0f471890833651',
    version: 'v4',
})

export async function getPosts() {
    return await api.posts
        .browse({ limit: 'all' })
        .catch(err => console.error(err))
}

export async function getDraftPosts() {
    return await adminApi.posts
        .browse({
            limit: 'all',
            formats: 'html,mobiledoc',
            filter: 'status:draft',
        }).catch(err => console.error(err))
}

export async function getPost(slug, isDraft) {
    let post = null
    if (isDraft) {
        post = await adminApi.posts
            .read({ slug, formats: 'html' })
            .catch(err => console.error(err))
    } else {
        post = await api.posts
            .read({ slug })
            .catch(err => console.error(err))
    }

    return {
        ...post,
        data: new JSDOM(post.html)
    }
}