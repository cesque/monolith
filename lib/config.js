let config = {
    
}

if(process.env.VERCEL) {
    config = {
        ...config,
        url: `https://monolith.cesque.com`,
    }
} else {
    config = {
        ...config,
        url: `http://localhost:3000`,
    }
}

export default config