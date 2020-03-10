const path = require('path')
const express = require('express')
var ejs = require('ejs')
const app = express()
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackConf = require('./webpack.config.js')

app.engine('html', ejs.renderFile)
app.set('views', path.join(__dirname, 'dist'))
app.set('view engine', 'html')

var compiler = webpack(webpackConf)

app.use(
  webpackMiddleware(compiler, {
    publicPath: webpackConf.output.publicPath
  })
)

app.get('/a', function(req, res) {
  res.render('index')
})

app.get('/c', function(req, res) {
  res.render('c')
})

app.listen(3333)
