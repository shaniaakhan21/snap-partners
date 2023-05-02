const withTM = require('next-transpile-modules')(['@dabeng/react-orgchart'])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites () {
    return process.env.NODE_ENV !== 'production'
      ? [
        {
          source: '/api/:path*',
          // destination: `http://192.168.2.103:8080/:path*`
          destination: 'https://snapdeliveredteam.com/api/:path*'
        }
      ]
      : []
  }
}

module.exports = withTM(nextConfig)
