import { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    serverExternalPackages: ['@navikt/next-logger', 'next-logger', 'pino'],
    experimental: {
        optimizePackageImports: ['@navikt/ds-react'],
    },
}

export default nextConfig
