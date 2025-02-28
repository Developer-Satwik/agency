/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    optimizeCss: false
  }
};

module.exports = nextConfig;