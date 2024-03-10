const babel = require("rollup-plugin-babel");

module.exports = {
	input: "./src/index.js",
	output: {
		name: "hzqServer", // 自定义命名
		file: "./dist/bundle.js",
		format: "umd",
	},
	treeshake: false,
	plugins: [
		babel({
			runtimeHelpers: true,
			extensions: [".js", ".ts"],
			exclude: "node_modules/**",
			externalHelpers: true,
		}),
	],
};
