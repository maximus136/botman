var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const autoprefixer = require('autoprefixer');

//const pkg = require('./package.json');

module.exports = {
  entry: {
    //vendor: Object.keys(pkg.dependencies).concat('./src/vendor'),
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
    },
    aliasFields: ["browser"],

    extensions: ['.js', '.scss', '.json'],

    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], { verbose: false }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      }
    }),
    new CopyWebpackPlugin([{ from: 'public/' }]),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest'],
      minChunks: Infinity,
      filename: '[name].[chunkhash:8].js'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new OfflinePlugin({
      excludes: ["images/*"],
      ServiceWorker: { events: true }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'src'),
      exclude: "/(node_modules)/",
      query: {
          presets: ["es2015","react","latest","stage-0"],
          plugins: [
            "transform-object-rest-spread",
            "syntax-dynamic-import",
            "transform-decorators-legacy",
            "transform-react-constant-elements",
            "transform-react-inline-elements"
          ]
      }
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
