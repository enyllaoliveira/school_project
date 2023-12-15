/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URLBase: 'https://test-dev.tikal.tech',
    NEXTAUTH_SECRET: '12309876'
  },
}

module.exports = nextConfig
