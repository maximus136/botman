const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const autoprefixer = require('autoprefixer');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/vendor',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      serviceWorker: 'sw.js'
    }),
    
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      }
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'botman',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'sw.js',
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    })
  ],
  resolve: {
    alias: {
      // directories must start with '/' to resolve correctly
      altSrc: __dirname + '/src/alt',
      helpers: __dirname + '/src/helpers'
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.(css|scss)$/,
      loaders: [
        'style-loader',
        'css-loader',
        'sass-loader',
        'postcss-loader'
      ]
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loaders: [
        'file-loader'
      ]
    },
    { 
      test: /\.(png|jpg|svg)$/,
      loader: 'url-loader?limit=8192'
    }
  ]
  }
};
