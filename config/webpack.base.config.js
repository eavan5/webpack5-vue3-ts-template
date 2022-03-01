const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'), // 打包出口
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
	devtool: 'eval-cheap-module-source-map', // 精简sourcemap
	module: {
		rules: [
			{
				test: /\.tsx?$/i,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			// 这个插件可以通过一个模板帮助我们生成网站的首页，而且可以帮助我们将输入的模板自动嵌入到指定的文件中
			title: 'webpack5-ts-vue',
			template: './src/tpl/index.html',
		}),
		new CleanWebpackPlugin(), // 这个是用来清空之前打包的文件
	],
}
