/* eslint-disable @typescript-eslint/no-var-requires */

const withLess = require('next-with-less');

const nextConfig = withLess({
    lessLoaderOptions: {},
    async rewrites() {
        return [
            {
                source: '/callback',
                destination: '/api/callback',
            },
            {
                source: '/login',
                destination: '/api/login',
            },
        ];
    },
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['src'],
    },
});

module.exports = nextConfig;
