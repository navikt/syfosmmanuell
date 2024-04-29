/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['src'],
    },
    experimental: {
        serverComponentsExternalPackages: ['@navikt/next-logger', 'next-logger'],
        optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
    },
    output: 'standalone',
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
}

module.exports = nextConfig
