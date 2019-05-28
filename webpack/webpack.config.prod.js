const Path = require("path");
const Webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  stats: "errors-only",
  bail: true,
  output: {
    // filename: "js/[name].[chunkhash:8].js",
    // chunkFilename: "js/[name].[chunkhash:8].chunk.js"
    filename: "js/[name].bundle.js",
    chunkFilename: "js/[name].chunk.js"
  },
  optimization:{
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()] // minify css & JS files on PROD
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. Extract css into files
          "css-loader?sourceMap=true", // 2. Turn css into commonjs
          "sass-loader", // 1. Turn sass into css
          {
            loader: "sass-resources-loader", // Make SASS variables/mixins avalaibe in other SASS files
            options: {
              resources: ["./src/styles/_variables.scss", "./src/styles/_mixins.scss","./src/styles/_common.scss"]
            },
          },
        ],
      },
    ],
  },
});
