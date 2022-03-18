const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader'); // 引入VueLoaderPlugin

// 路径处理方法
function resolve (...args) {
  return path.join(__dirname, '../', ...args);
}

module.exports = {
  entry: './src/main.ts',
  output: {
    path: resolve('./dist'), // 打包出口
    filename: 'js/[name].js', // 打包完的静态资源文件名
  },
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.vue'], // 指定文件扩展名.这几个配置的可以不写后缀名
    // 配置别名
    alias: {
      '@': resolve('src'),
    },
  },
  // webpack升级到5.0后，target默认值值会根据package.json中的browserslist改变，导致devServer的自动更新失效
  // 所以 development 环境下直接配置成 web
  target: 'web',
  devServer: {
    hot: true, // 启用热模块替换
    compress: true, // 启用gzip
    open: true, // 打开默认浏览器
    historyApiFallback: true, // 解决history模式刷新404
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(j|t)s$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/, use: [
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
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader", 'less-loader'] },
      {
        test: /\.s[c|a]ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader", {
          loader: "sass-loader",
          options: {
            implementation: require("sass"),
          }
        }]
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
    new MiniCssExtractPlugin(
      {
        filename: '[name].[hash:8].css'
      }
    ), // 为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
    new HtmlWebpackPlugin({
      // 这个插件可以通过一个模板帮助我们生成网站的首页，而且可以帮助我们将输入的模板自动嵌入到指定的文件中
      title: 'webpack5-ts-vue',
      template: './src/tpl/index.html',
    }),
    new ProgressBarPlugin(), // 打包进度条
    new VueLoaderPlugin(), // 新增 VueLoaderPlugin
  ],
}
