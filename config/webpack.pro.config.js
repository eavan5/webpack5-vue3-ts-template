const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/, use: ['style-loader',
          MiniCssExtractPlugin.loader, // 添加 loader
          {
            loader: 'css-loader',
            options: {
              url: true, // 处理url地址 比如 bgi:url里面的url
              import: true, // 是否需要处理源码中的import关键字
              modules: false, // 是否要对类名进行模块化处理 类似vue的style scoped
              sourceMap: false, // 是否生成sourceMap
              esModule: true, // {default:css内容}
            }
          },
          "postcss-loader"]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(), // 为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
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
