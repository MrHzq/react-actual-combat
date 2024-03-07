const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.base");

// 基于 webpack 的官方 merge 方法，将 baseConfig 和 prodConfig 合并
module.exports = merge(baseConfig(), {
	mode: "production",
});
