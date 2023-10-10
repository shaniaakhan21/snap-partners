const withTM = require('next-transpile-modules')(['@dabeng/react-orgchart'])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites () {
    return process.env.NODE_ENV !== 'production'
      ? [
        {
          source: '/api/:path*',
          // destination: `http://localhost:8080/:path*`
          destination: 'https://snap450.snap.devopsteam.info//api/:path*'
          // destination: 'https://individualdashboard.snap.devopsteam.info/api/:path*'
        }
      ]
      : []
  }
}

module.exports = withTM(nextConfig)
