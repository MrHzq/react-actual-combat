const { merge } = require("webpack-merge");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const TerserPlugin = require("terser-webpack-plugin");

const baseConfig = require("./webpack.base");

// 基于 webpack 的官方 merge 方法，将 baseConfig 和 prodConfig 合并
module.exports = merge(baseConfig(), {
	// 生产环境配置

	mode: "production",

	// 优化配置
	optimization: {
		minimizer: [
			// 压缩 css
			new CssMinimizerPlugin(),

			// 压缩 js
			new TerserPlugin({
				// 开启多进程并行运行
				parallel: true,

				// 压缩参数
				terserOptions: {
					// 开启压缩
					compress: {
						pure_funcs: ["console.log", "console.warn"], // 移除 console
					},
				},
			}),
		],

		// 代码分割配置(拆包)
		splitChunks: {
			// 缓存组
			cacheGroups: {
				// 第三方库: https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunkscachegroups
				vendors: {
					name: "vendors",
					test: /node_modules/,
					// 官方已经默认设置了比较合理的 minSize: 30000，minChunks: 1 等，所以我们不要额外去更改
				},
				// 公共代码
				commoms: {
					name: "commons",
				},
			},
		},
	},
});
