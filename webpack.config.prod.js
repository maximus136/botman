var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const autoprefixer = require('autoprefixer');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const pkg = require('./package.json');

module.exports = {
  entry: {
    vendor: './src/vendor',
    app: './src/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[chunkhash:8].js',
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      // directories must start with '/' to resolve correctly
      altSrc: __dirname + '/src/alt',
      helpers: __dirname + '/src/helpers'
    }
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], { verbose: false }),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
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
    }),
    new CopyWebpackPlugin([{ from: 'public/' }]),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity,
      filename: '[name].[chunkhash:8].js'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ],
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
