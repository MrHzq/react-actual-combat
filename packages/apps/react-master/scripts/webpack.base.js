const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (isDev) {
	return {
		// 1、输入输出部分
		// 输入，当你不知道是用 ./scr、../src、@/scr 时就使用 path 来处理，__dirname 当前目录
		entry: path.resolve(__dirname, "../src/index.tsx"),
		// 输出
		output: {
			// 打包后文件的位置
			path: path.resolve(__dirname, "../dist"),
			// 打包后 js 的名字，采用了占位符，[name] 代表入口文件的名字，[hash:8] 代表打包后文件的 hash 值，取前 8 位
			// hash 每次打包后根据内容生成 hash 值（任一文件有变动则 hash 会变，颗粒度最大）
			// contenthash 每次打包后根据内容生成 hash 值（当输出内容变化则 hash 会变，颗粒度最小）
			// chunkhash 每次打包后根据 chunk 生成 hash 值（当代码块变化则 hash 会变，颗粒度居中）
			filename: "static/js/[name]/[hash:8].js",

			// webpack 5 内置的，构建前清空 dist 目录
			// webpack 4 没有，需安装 clean-webpack-plugin
			clean: true,

			// 打包后静态资源的位置，相对于 output.path
			publicPath: "/",
		},

		// 2、resolve 部分
		resolve: {
			// 用于在引入文件时，不需要写后缀名
			extensions: [".tsx", ".ts", ".jsx", ".js"], // 优先级从左到右，会影响性能的
		},

		// 3、loader 部分：
		module: {
			// loader 是 webpack 的核心，从入口文件起去解析 import from 的文件时，针对不同类型的文件进行不同处理
			// 所以不同文件需要对应的解析器，去识别解析它，从而保证最后能形成一个 bundle
			rules: [
				{
					test: /\.(tsx|ts)$/,
					use: {
						// 要使用 babel-loader 就需要有对应配置文件（.babelrc）
						loader: "babel-loader", // 有了这个 loader，react 就已经可以跑起来了
					},
				},
				{
					// 为了避免三个 loader 重复处理，采用 oneOf 的实现匹配一个规则
					oneOf: [
						{
							test: /\.css$/, // 匹配 css 文件
							use: [
								// style-loader 用于将 css 放到元素内联样式上
								// dev 环境使用 style-loader，方便热更新替换
								// 生产环境使用 MiniCssExtractPlugin.loader 单独提取成 css 文件，方便缓存，还需要在下面的 plugin 中配置
								isDev ? "style-loader" : MiniCssExtractPlugin.loader,
								"css-loader", // 主要处理路径，给<link> 用
								"postcss-loader", // 处理语法转换，postcss 就是 css 界的 babel，需要有对应配置文件（.postcssrc.js）
							],
						},
						// 定义规则：针对模块化的 css，统一采用 .module.css|.less 形式命名文件
						{
							test: /\.module\.(css|less)$/,
							include: [path.resolve(__dirname, "../src")], // 指定生效的目录
							use: [
								isDev ? "style-loader" : MiniCssExtractPlugin.loader,
								{
									// 配置 css-loader 的 modules 模式
									loader: "css-loader",
									options: {
										modules: {
											// 借用 css-module 实现我们的 BEM 命名规范

											// localIdentName：会将 class 名替换成 [path][name]__[local]--[hash:base64:5]
											localIdentName: "[path][name]__[local]--[hash:base64:5]",
										},
									},
								},
								"postcss-loader",
								"less-loader",
							],
						},
						{
							test: /\.less$/, // 匹配 less 文件
							use: [
								isDev ? "style-loader" : MiniCssExtractPlugin.loader,
								"css-loader",
								"postcss-loader",
								"less-loader",
							],
						},
					],
				},
			],
		},

		plugins: [
			// HtmlWebpackPlugin：将打包后的 js、css 注入到 html 文件中
			new HtmlWebpackPlugin({
				// 指定模板文件位置
				template: path.resolve(__dirname, "../public/index.html"),
				// 自动注入打包后的 js、css 文件
				inject: true,
			}),
			new MiniCssExtractPlugin({
				filename: isDev
					? "static/css/[name].css"
					: "static/css/[name].[contenthash:4].css",
			}),
		],
	};
};
