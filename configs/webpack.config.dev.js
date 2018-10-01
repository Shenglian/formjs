const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const utils = require('./utils')
const path = require('path');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
};

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: {
    app: [PATHS.src]
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.jsm']
  },
  devtool: 'eval-sourcemap',
  module: {
    rules: [
      { test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../index.ejs',
      title: 'Webpack 4 Demo',
      meta: [{
          name: 'robots',
          content: 'noindex,nofollow'
        },
        {
          name: 'description',
          content: 'Webpack 4 demo using ES6, React, SASS'
        },
        {
          name: 'keywords',
          content: 'webpack,webpack-4,webpack.config.js,html5,es6+,react,sass'
        }
      ],
      appMountIds: ['app'],
      inject: false,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: true,
        useShortDoctype: true,
        html5: true
      },
      mobile: true,
      scripts: ['/static.js']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      VERSION: JSON.stringify('1.1.0'),
      SHENG: JSON.stringify('SHENG'),
      DEBUG: true,
    })
  ],
  devServer: {
    contentBase: PATHS.dist,
    compress: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    },
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    // host: '0.0.0.0',
    port: 8080,
    publicPath: 'http://localhost:8080/',
    hot: true
  },
  stats: {
    children: false
  }
};