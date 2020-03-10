const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const chalk = require('chalk')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const path = require('path')
const isDev = process.env.NODE_ENV !== 'production'

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
  // 使用webpack-dev-server的时候默认打开
  watch: false,
  watchOptions: {
    // 类似于节流， 500ms内的更改内造成的build将会合并成一次
    aggregateTimeout: 500,
    // 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
    poll: 1000,
    ignored: /node_modules|dist|.vscode/
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
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loaders: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
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
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 30000,
  //     minChunks: 3
  //   }
  // }
}

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    // port: 9528,
    // host: '127.0.0.1',
    // overlay: {
    //   errors: true
    // },
    // hot: true,
    // open: false,
    // contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000/',
    //     ws: true,
    //     changeOrigin: true,
    //     bypass: function(req, res, proxyOptions) {
    //       // console.log(req)
    //     },
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
    // before(app) {
    //   // 可以mock数据使用
    //   app.get('/user', (req, res) => {
    //     res.json({
    //       desc: 'mock数据'
    //     })
    //   })
    //   console.log(
    //     '------- before, 在服务内部的所有其他中间件之前， 提供执行自定义中间件的功能。-------'
    //   )
    //   // console.log(app)
    // },
    // after(app) {
    //   console.log(
    //     '------- after ,在服务内部的所有其他中间件之后， 提供执行自定义中间件的功能。-------'
    //   )
    //   // console.log(app)
    // }
  }

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config
