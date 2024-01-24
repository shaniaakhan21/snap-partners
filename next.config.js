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
          destination: 'https://snapdeliveredteam.com/api/:path*'
          // destination: 'https://1099notifications.snap.devopsteam.info/api/:path*'
        }
      ]
      : []
  }
}

module.exports = withTM(nextConfig)
