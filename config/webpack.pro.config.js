const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  Plugin: [
    new CleanWebpackPlugin(), // 这个是用来清空之前打包的文件
  ]
}
