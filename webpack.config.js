const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack')
const path = require('path')
const dotenv = require('dotenv').config().parsed
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const LocalApi = {
  '/api': {
    target: `http://localhost:${dotenv.REACT_APP_API_PORT}/`,
    pathRewrite: { '^/api': '' }
  }
}

const RemoteApi = {
  '/api': {
    target: 'https://snapdeliveredteam.com/api/',
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/api': '' }
  }
}

let proxy = LocalApi

if (dotenv.USE_REMOTE_API === 'TRUE') {
  proxy = RemoteApi
}

module.exports = {
  resolve: {
    fallback: {
      "os": require.resolve("os-browserify/browser"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "assert": require.resolve("assert/"),
      "stream": require.resolve("stream-browserify")
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, /// < put all used node_modules modules in this chunk
          name: 'vendor', /// < name of bundle
          chunks: 'all' /// < type of code to put in this bundle
        }
      }
    }
  },
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new Dotenv()
    // new BundleAnalyzerPlugin()
  ],
  devServer: {
    hot: true,
    proxy: proxy,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'svg'),
      publicPath: '/svg'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: {
          loader: 'svg-url-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: {
          loader: 'css-loader'
        }
      }
    ]
  }
}
