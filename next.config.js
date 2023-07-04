/* eslint-disable @typescript-eslint/no-var-requires */

const withLess = require('next-with-less')

const nextConfig = withLess({
    lessLoaderOptions: {},
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['src'],
    },
    output: 'standalone',
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
})

module.exports = nextConfig
