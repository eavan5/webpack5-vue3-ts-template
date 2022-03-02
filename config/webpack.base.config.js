const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const path = require('path')
module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../', './dist'), // 打包出口
    filename: 'js/[name].js', // 打包完的静态资源文件名
  },
  resolve: {
    extensions: ['.js', 'ts', 'tsx'], // 指定文件扩展名
  },
  // webpack升级到5.0后，target默认值值会根据package.json中的browserslist改变，导致devServer的自动更新失效
  // 所以 development 环境下直接配置成 web
  target: 'web',
  devServer: {
    hot: true, // 启用热模块替换
    open: true, // 打开默认浏览器
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {}
          },
          {
            loader: 'css-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {}
          },
          {
            loader: 'css-loader',
            options: {}
          },
          {
            loader: 'less-loader',
            options: {}
          }
        ]
      },
      //压缩静态资源
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'asset',
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
      },
      // 静态资源
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: "asset/img/[name]_[hash:6][ext]" // 指定文件名格式目录
        },
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024 // 10kb  指定大小 小于该值则使用inline模式
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: "asset/audio/[name]_[hash:6][ext]" // 指定文件名格式目录
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb  指定大小
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: "asset/font/[name]_[hash:6][ext]" // 指定文件名格式目录
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb  指定大小
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 这个插件可以通过一个模板帮助我们生成网站的首页，而且可以帮助我们将输入的模板自动嵌入到指定的文件中
      title: 'webpack5-ts-vue',
      template: './src/tpl/index.html',
    }),
    new ProgressBarPlugin(), // 打包进度条
  ],
}
