const generator = require("@babel/generator").default;

// Babel 自定义插件官方文档：https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-writing-your-first-babel-plugin

function consolePlugin({ types }) {
	return {
		visitor: {
			CallExpression(path) {
				const name = generator(path.node.callee).code;

				if (["console.log", "console.info", "console.error"].includes(name)) {
					const { line, column } = path.node.loc.start;
					path.node.arguments.unshift(
						types.stringLiteral(`fliepath: ${line}:${column}`),
					);
				}
			},
		},
	};
}

module.exports = consolePlugin;
