let config = {}

if(process.env.VERCEL_ENV) {
    config = {
        url: `https://monolith.cesque.com/`
    }
} else {
    config = {
        url: `http://localhost:1234/`
    }
}

export default config