const JSzip = require("jszip"); // 引入jszip

// RawSource 是其中一种 “源码”("sources") 类型，
const { RawSource } = require("webpack-sources");

// 自定义插件 官方文档：https://webpack.docschina.org/contribute/writing-a-plugin/#creating-a-plugin
class ZipPlugin {
	static defaultOptions = {
		outputFile: "dist.zip",
	};

	constructor(options) {
		this.options = { ...ZipPlugin.defaultOptions, ...options };
	}

	// 在插件函数的 prototype 上定义一个 `apply` 方法，以 compiler 为参数。
	apply(compiler) {
		const pluginName = ZipPlugin.name;

		compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
			const zip = new JSzip();

			// 遍历所有资源
			Object.keys(compilation.assets).forEach((filename) => {
				const source = compilation.assets[filename].source();

				zip.file(filename, source); // 添加文件到 zip
			});

			// generateAsync：生成 zip 文件
			zip.generateAsync({ type: "nodebuffer" }).then((content) => {
				// 向 compilation 添加新的资源，这样 webpack 就会自动生成并输出到 outputFile 目录
				compilation.emitAsset(this.options.outputFile, new RawSource(content));
				callback(); // 告诉 webpack 插件已经完成
			});
		});
	}
}

module.exports = { ZipPlugin };
