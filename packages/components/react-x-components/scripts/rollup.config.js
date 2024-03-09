const clear = require("rollup-plugin-clear");
const autoAdd = require("rollup-plugin-auto-add").default;
const multiInput = require("rollup-plugin-multi-input").default;
const typescript = require("rollup-plugin-typescript2");
const path = require("path");
const peerDepExternal = require("rollup-plugin-peer-deps-external");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const alias = require("@rollup/plugin-alias");
const postcss = require("rollup-plugin-postcss");
const { terser } = require("rollup-plugin-terser");
const filesize = require("rollup-plugin-filesize");

const pkg = require("../package.json");
module.exports = [
	// 打包成 esm 的配置项
	{
		input: "src/**/*",
		output: [
			{
				dir: "esm",
				format: "esm",
				sourceMap: false,
			},
		],

		// 打包时排除 peerDenpendencies 里面的依赖
		enternal: Object.keys(pkg.peerDenpendencies || {}),

		plugins: [
			// 自动清除生成代码
			clear({ target: "esm" }),

			// 自动注入代码
			autoAdd({
				// 匹配这种 src/myComponent/index.tsx
				include: [/src\/(((?!\/).)+?)\/index\.tsx/gi],
			}),

			// 多入口
			multiInput(),

			// 解析 ts
			typescript({
				path: path.resolve(__dirname, "./tsconfig.esm.json"),
			}),
			peerDepExternal(),
			resolve(), // 处理 node_modules
			commonjs(), // 处理 commonjs
			filesize(), // 处理包体积
			postcss({
				minimize: true,
				sourceMap: true,
				extensions: [".less", ".css"],
				use: ["less"],
			}),
			// 文件声明
			alias({
				entries: {
					"@": path.resolve(__dirname, "../src"),
				},
			}),
		],
	},

	// 打包成 umd 的配置项
	{
		input: "src/index.tsx",
		output: [
			{
				dir: "dist",
				format: "umd",
				exports: "named",
				name: pkg.name,
				sourceMap: true,
			},
		],

		// 打包时排除 peerDenpendencies 里面的依赖
		enternal: Object.keys(pkg.peerDenpendencies || {}),

		plugins: [
			// 自动清除生成代码
			clear({ target: "dist" }),

			// 自动注入代码
			autoAdd({
				// 匹配这种 src/myComponent/index.tsx
				include: [/src\/(((?!\/).)+?)\/index\.tsx/gi],
			}),

			// 多入口
			multiInput(),

			// 解析 ts
			typescript({
				path: path.resolve(__dirname, "./tsconfig.dist.json"),
			}),
			peerDepExternal(),
			resolve(), // 处理 node_modules
			commonjs(), // 处理 commonjs
			filesize(), // 处理包体积
			postcss({
				minimize: true,
				sourceMap: true,
				extensions: [".less", ".css"],
				use: ["less"],
			}),
			// 文件声明
			alias({
				entries: {
					"@": path.resolve(__dirname, "../src"),
				},
			}),

			terser(), // 开启 ts 压缩
		],
	},
];
