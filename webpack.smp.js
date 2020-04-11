const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const wepackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.js')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin({
  outputFormat: 'human' // json|human|humanVerbose
})

const prodConfig = wepackMerge(baseConfig, {
  mode: 'production',
  devtool: '#cheap-module-eval-source-map',
  optimization: {
    splitChunks: {
      // 分割代码块
      cacheGroups: {
        // 缓存组
        common: {
          // 公共模块
          chunks: 'initial', // 入口开始
          minSize: 0,
          minChunks: 2
        },
        vendor: {
          priority: 1,
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
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

module.exports = smp.wrap(prodConfig)
