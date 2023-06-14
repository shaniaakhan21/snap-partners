const withTM = require('next-transpile-modules')(['@dabeng/react-orgchart'])
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  async rewrites () {
    return process.env.NODE_ENV !== 'production'
      ? [
        {
          source: '/api/:path*',
          // destination: `http://localhost:8080/:path*`
          destination: 'https://snapdeliveredteam.com/api/:path*'
        }
      ]
      : []
  }
}

module.exports = withTM(nextConfig)
