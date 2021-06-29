// module.exports = {
//     webpack: (config, { isServer }) => {
//         if (!isServer) {
//             config.node = {
//                 net: 'empty',
//                 fs: 'empty',
//                 tls: 'empty',
//                 child_process: 'empty',
//             };
//         }

//         return config;
//     }
// }

module.exports = {
    images: {
        // loader: 'imgix',
        path: '',
    },
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },
    webpack: (config, options) => {
        config.experiments = {
            topLevelAwait: true,
        }

        return config
    },
}