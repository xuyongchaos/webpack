const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const chalk = require('chalk')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const path = require('path')

const BasicPlugin = require('./plugins/BasicPlugin/index.js')

console.log(`当前运行环境:${chalk.green(process.env.NODE_ENV)}`)

const config = {
  mode: process.env.NODE_ENV,
  context: path.join(__dirname, 'src'),
  entry: {
    'js/main': './main.js',
    c: './views/c/c.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: ''
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      components: path.join(__dirname, 'src/components'),
      views: path.join(__dirname, 'src/views')
    },
    // 指定从哪里查找第三方模块
    modules: ['./node_modules'],
    // 所有导入语句强制性都得带上文件后缀
    enforceExtension: false,
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loaders: ['vue-loader']
      },
      {
        test: /\.js$/,
        loader: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|ico|ttf|woff)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?emitFile=false'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack配置例子',
      filename: 'index.html',
      template: 'index.html',
      chunks: ['js/main'],
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联css
      }
    }),
    new HtmlWebpackPlugin({
      title: 'webpack配置例子',
      filename: 'c.html',
      template: 'index.html',
      chunks: ['c']
    }),
    new CopyWebpackPlugin([
      {
        from: '../mainfest.json',
        to: 'mainfest.json',
        transform(rawStr) {
          let content = JSON.parse(rawStr)
          content.version = 'xyc'
          content = JSON.stringify(content, null, 2)
          return content
        }
      }
    ]),
    // 在每个chunk文件的头部添加一行注释
    new webpack.BannerPlugin({
      banner: 'webpack.BannerPlugin 插件添加的内容'
    }),
    new StylelintPlugin({
      files: '**/*.{vue,less}',
      fix: true
    }),
    new BasicPlugin({
      name: 'BasicPlugin',
      desction: '自定义插件-1'
    }),
    new webpack.DefinePlugin({
      DEV: "'dev'",
      EXPRESSION: "'注入的一个运行时全局变量'"
    })
  ]
}

module.exports = config
