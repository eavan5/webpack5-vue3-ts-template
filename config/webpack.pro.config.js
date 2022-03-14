const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
var BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(), // 这个是用来清空之前打包的文件
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10,
      minRatio: 0.8
    }),
  ]
}
