const { merge } = require("webpack-merge");

const path = require("path");

const baseConfig = require("./webpack.base");

// 基于 webpack 的官方 merge 方法，将 baseConfig 和 devConfig 合并
module.exports = merge(baseConfig(true), {
	// 开发环境配置

	mode: "development",

	// 源码调试：使用 source-map
	devtool: "eval-cheap-module-source-map",

	// 开发服务器配置
	devServer: {
		port: 3000,
		compress: false, // 关闭压缩，这样热更新会更快
		hot: true, // 开启热更新
		historyApiFallback: true, // 解决开发环境 history 路由 404 的问题
		static: {
			// 托管静态资源 public 文件夹
			directory: path.resolve(__dirname, "../public"),
		},
	},
});
