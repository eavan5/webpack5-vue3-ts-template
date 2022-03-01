const HtmlWebpackPlugin = require('html-webpack-plugin')
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
	],
}
