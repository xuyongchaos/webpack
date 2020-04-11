const Config = require('webpack-chain')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const config = new Config()

config.mode('production')
config.context(path.join(__dirname, 'src'))

config
  .entry('main').add('./main.js').end()
  .entry('c').add('./views/c/c.js').end()
  .entry('vendor').add('vue').add('vue-router').end()

config.module.rule('js')
  .test(/\.js$/)
  .use('js')
  .loader('babel-loader')
  .loader('eslint-loader')
  .end()

config.module.rule('vue')
  .test(/\.vue$/)
  .use('vue')
  .loader('vue-loader').end()

config.module
  .rule('css')
  .test(/\.css$/)
  .use('css')
  .loader(MiniCssExtractPlugin.loader)
  .loader('css-loader')
  .end()

config.module.rule('less')
  .test(/\.less$/)
  .use('less')
  .loader(MiniCssExtractPlugin.loader)
  .loader('css-loader')
  .loader('less-loader')
  .end()

config.plugin('vue').use(VueLoaderPlugin).end()
config
  .plugin('MiniCssExtract')
  .use(MiniCssExtractPlugin, [
    { filename: 'css/[name].css' }
  ])
  .end()

config
  .plugin('HtmlWebpackPlugin')
  .use(HtmlWebpackPlugin)
  .end()

console.log(config.toConfig())
module.exports = config.toConfig()
