const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const wepackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.js')

module.exports = wepackMerge(baseConfig, {
  mode: 'production',
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 30000,
  //     minChunks: 3
  //   }
  // }
})
