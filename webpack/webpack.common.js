const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    home: Path.resolve(__dirname, '../src/scripts/home-entry.js'),
    location: Path.resolve(__dirname, '../src/scripts/location-entry.js'),
    dayplanner: Path.resolve(__dirname, '../src/scripts/dayplanner-entry.js')
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public'), to: 'public' }
    ]),
    new HtmlWebpackPlugin({
      // template: Path.resolve(__dirname, '../src/location.html')
      // template: Path.resolve(__dirname, '../src/index.html')     
      // chunks: ['home', 'location', 'dayplanner'],
      template: Path.resolve(__dirname, '../src/dayplanner.html')

    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })

    // new HtmlWebpackPlugin({
    //   inject: false,
    //   chunks: ['home'],
    //   template: Path.resolve(__dirname, '../src/index.html'),
    //   filename: '../build/index.html'
    // }),
    // new HtmlWebpackPlugin({
    //   inject: false,
    //   chunks: ['location'],
    //   template: Path.resolve(__dirname, '../src/location.html'),
    //   filename: '../build/location.html'
    // })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
    ]
  }
};
