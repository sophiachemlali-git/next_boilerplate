/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // Uncomment if your site is 100% Static (Static Site Generation - SSG)
  // distDir: 'dist',
  images: { unoptimized: true },
  trailingSlash: true,
}

module.exports = nextConfig
