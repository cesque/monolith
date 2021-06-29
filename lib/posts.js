import GhostContentAPI from '@tryghost/content-api'
import GhostAdminAPI from '@tryghost/admin-api'

const jsdom = require('jsdom')
const { JSDOM } = jsdom

const { createCanvas, registerFont } = require('canvas')
import * as fs from 'fs/promises'

const cloudinary = require('cloudinary').v2

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

export async function uploadOrFetchMetaImage(slug) {
    registerFont('./public/SpaceMono-Bold.ttf', { family: 'Space Mono' })

    const canvas = createCanvas(1000, 500)
    const ctx = canvas.getContext('2d')

    let padding = 40
    
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let headerText = 'monolith ◆ by cesque'

    ctx.font = '2rem "Space Mono"'
    let headerMetrics = ctx.measureText(headerText)
    let headerHeight = headerMetrics.emHeightAscent + headerMetrics.emHeightDescent
    
    let headerBox = {
        x: 0,
        y: padding,
        width: canvas.width,
        height: headerHeight + padding,
    }

    ctx.fillStyle = 'white'
    ctx.fillRect(headerBox.x, headerBox.y, headerBox.width, headerBox.height)

    ctx.fillStyle = 'black'
    ctx.fillText(
        headerText,
        headerBox.x + padding,
        (headerBox.y + headerBox.height) - padding
    )

    ctx.font = '5rem "Space Mono"'
    let lineHeight = 1.1
    let titleText = slug
    let titleMetrics = ctx.measureText(titleText)
    let titleHeight = titleMetrics.actualBoundingBoxAscent + titleMetrics.actualBoundingBoxDescent
    
    let titleBox = {
        x: 0,
        y: headerBox.y + headerBox.height,
        width: canvas.width,
        height: (canvas.height - (headerBox.y + headerBox.height)) - padding
    }
    
    ctx.fillStyle = 'black'
    ctx.fillRect(titleBox.x, titleBox.y, titleBox.width, titleBox.height)

    if(slug) {
        ctx.fillStyle = 'white'

        let position = {
            x: titleBox.x + padding,
            y: titleBox.y + (padding / 2)
        }

        for(let i = 0; i < titleText.length; i++) {
            let letter = titleText[i]
            let letterMetrics = ctx.measureText(letter)

            if((i < titleText.length - 1) && ((position.x + letterMetrics.width) > (canvas.width - (1.5 * padding) - letterMetrics.width))) {
                ctx.fillText(
                    '◆',
                    position.x,
                    position.y + titleHeight
                )

                position.x = titleBox.x + padding,
                position.y += titleHeight * lineHeight
            }

            ctx.fillText(
                letter,
                position.x,
                position.y + titleHeight * lineHeight
            )

            position.x += letterMetrics.width
        }
    }

    const buffer = canvas.toDataURL('image/png')

    let fileName = slug || `index` 
    
    let check = null 
    try {
        check = await cloudinary.uploader.explicit(`monolith-thumbnails/${ fileName }`, { type: 'upload' })
    } catch(e) {
        console.error(e)
    }

    if(check && check.asset_id) {
        console.log(`found ${ fileName } at ${ check.secure_url }`)

        return check.secure_url
    } else {
        if(process.env.VERCEL) {
            console.log(`...writing ${ fileName }.png`)
    
            let result = await cloudinary.uploader.upload(buffer, {
                public_id: slug || 'index',
                folder: "monolith-thumbnails"
            })
    
            console.log(`wrote ${ fileName }.png to ${ result.secure_url }`)
    
            return result.secure_url
        } else {
            console.log(`local env, skipping upload of ${ fileName }`)
            
            return ''
        }
    }
}