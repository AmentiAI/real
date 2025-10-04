/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  swcMinify: true, // Enable SWC minification
}

module.exports = nextConfig
