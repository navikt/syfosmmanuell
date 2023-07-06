/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['src'],
    },
    output: 'standalone',
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
}

module.exports = nextConfig
