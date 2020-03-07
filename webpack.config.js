const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const chalk = require("chalk");
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

console.log(`当前运行环境:${chalk.green(process.env.NODE_ENV)}`);

const config = {
  mode: process.env.NODE_ENV,
  context: __dirname + "/src",
  entry: './main.js',
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".vue", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loaders: ["vue-loader"]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loaders: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg|ico|ttf|woff)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?emitFile=false"
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      title: "webpack配置例子",
      filename: "index.html",
      template: "index.html",
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联css
      }
    })
  ]
};

if(isDev){
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 9527,
    host: "127.0.0.1",
    overlay: {
      errors: true
    },
    hot: true,
    open: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true
  };

   config.plugins.push(
     new webpack.HotModuleReplacementPlugin(),

     new webpack.NoEmitOnErrorsPlugin()
   );
}

module.exports = config;
