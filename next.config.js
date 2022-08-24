/* eslint-disable @typescript-eslint/no-var-requires */

const withLess = require('next-with-less');
const { withSentryConfig } = require('@sentry/nextjs');

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

module.exports =
    process.env.SENTRY_ENABLED === 'true'
        ? withSentryConfig(nextConfig, {
              silent: true,
          })
        : nextConfig;
