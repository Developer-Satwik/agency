/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  distDir: '.next',
  experimental: {
    optimizeCss: true
  },
  trailingSlash: true
};

module.exports = nextConfig;