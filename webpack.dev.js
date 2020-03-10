const webpack = require('webpack')
const wepackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.js')

module.exports = wepackMerge(baseConfig, {
  mode: 'development',
  // 使用webpack-dev-server的时候默认打开
  watch: false,
  watchOptions: {
    // 类似于节流， 500ms内的更改内造成的build将会合并成一次
    aggregateTimeout: 500,
    // 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
    poll: 1000,
    ignored: /node_modules|dist|.vscode/
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  devServer: {
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
