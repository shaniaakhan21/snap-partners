// const { API } = require('config/api')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites () {
    return process.env.NODE_ENV !== 'production'
      ? [
        {
          source: '/api/:path*',
          // destination: `http://localhost:${API.BACKEND_PORT}/:path*`
          // destination: 'https://snapdeliveredteam.com/api/:path*'
          // destination: 'https://dev.snap.devopsteam.info/api/:path*'
          destination: 'http://test1stage.snap.devopsteam.info:9090/:path*'
        }
      ]
      : []
  }
}

// http://dev.snap.devopsteam.info/
