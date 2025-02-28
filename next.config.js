/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  distDir: 'out',
  experimental: {
    optimizeCss: true
  },
  trailingSlash: true
};

module.exports = nextConfig;