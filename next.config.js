/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  swcMinify: false, // Disable SWC minification
  experimental: {
    swcLoader: false, // Disable SWC loader
  },
}

module.exports = nextConfig
