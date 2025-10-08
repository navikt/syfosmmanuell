import { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['src'],
    },
    serverExternalPackages: ['@navikt/next-logger', 'next-logger', 'pino'],
    experimental: {
        optimizePackageImports: ['@navikt/ds-react'],
    },
}

export default nextConfig
