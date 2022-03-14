const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(), // 这个是用来清空之前打包的文件
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10, //! 正常应该设置为4000  表示4K
      minRatio: 0.8
    }),
    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/,
      threshold: 10, //! 正常应该设置为4000  表示4K
    })
  ]
}
