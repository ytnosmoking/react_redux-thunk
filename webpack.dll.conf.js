const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const WebpackBar = require('webpackbar');
const timeBar = new WebpackBar()

const CompressionPlugin = require('compression-webpack-plugin') // Gzip  只用在 开发阶段
const gzip = new CompressionPlugin({ // 文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
  filename: '[name].gz[query]',
  algorithm: 'gzip',
  test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
  threshold: 8192,
  minRatio: 0.8
})
const dllPath = 'public/vendor'
module.exports = {
  mode: 'production',
  entry: {
    // react: [
    //   'react',
    //   'react-dom',
    //   'react-router-dom',
    //   'redux',
    //   'react-transition-group',
    //   'axios'
    // ],
    ui: ['antd']

    // tools: ['animate.css']

  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]'
    // filename: '[name].dll.js',
    // library: '[name]-[hash]'
  },

  plugins: [
    // new webpack.Dllplugin({
    //   name: '[name]-[hash]'

    // }),
    timeBar,
    gzip,

    // 清除之前的dll文件
    new CleanWebpackPlugin(),
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}
