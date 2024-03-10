// eslint-disable-next-line @typescript-eslint/no-var-requires
const postcss = require("postcss");

module.exports = postcss.plugin("postcss-theme", (options) => {
	const defalutOpts = {
		functionName: "hzqTheme",
		themeGroup: {},
		defaultTheme: "light",
		themeSelector: 'html[data-theme="$_$"]',
		nestingPlugin: null,
	};

	// 合并参数
	options = Object.assign({}, defalutOpts, options);

	const getColorByThemeGroup = (color, theme) => {
		return options.themeGroup[theme][color];
	};

	// 正则：获取 hzqTheme(--color-white) 括号中的值：--color-white
	const regColorValue = new RegExp(
		`\\b${options.functionName}\\(([^)]+)\\)`,
		"g",
	);

	// 插件的入口函数
	return (style, result) => {
		const hasPlugin = (name) =>
			name.replace(/^postcss-/, "") === options.nestingPlugin ||
			result.processor.plugins.some((p) => p.postcssPlugin === name);

		// 获取 css 属性值，替换掉 hzqTheme(--color-gray-200)
		const getColorValue = (value, theme) => {
			return value.replace(regColorValue, (match, color) => {
				// match: hzqTheme(--color-gray-200)
				// color: --color-gray-200
				return getColorByThemeGroup(color, theme);
			});
		};

		style.walkDecls((decl) => {
			// decl 是每个 css 属性的对象，height: 10px 的 css ast { prop: "height", value: "10px" }

			// 每个 css 属性的具体值：height: 10px;
			const value = decl.value;

			if (!value || !regColorValue.test(value)) {
				// 如果没有匹配到，直接返回
				return;
			}

			// 说明有匹配到值

			try {
				let defaultTheme;

				Object.keys(options.themeGroup).forEach((key) => {
					// 处理各种模式
					const themeColor = getColorValue(value, key);
					const themeSelector = options.themeSelector.replace("$_$", key);
					let themeRule;
					// 使用 nest 插件，生成 dark 的规则：html[data-theme="dark"] {...}
					if (hasPlugin("postcss-nesting")) {
						themeRule = postcss.atRule({
							name: "nest",
							params: `${themeSelector} &`,
						});
					} else if (hasPlugin("postcss-nested")) {
						themeRule = postcss.rule({
							params: `${themeSelector} &`,
						});
					} else {
						throw new Error("请安装 postcss-nesting 或者 postcss-nested 插件");
					}
					const themeDecl = decl.clone({ value: themeColor });

					if (themeRule) {
						themeRule.append(themeDecl);
						decl.after(themeRule);
					}

					if (key === options.defaultTheme) {
						defaultTheme = themeDecl;
					}
				});

				// 处理为默认模式
				if (defaultTheme) decl.replaceWith(defaultTheme);
			} catch (error) {
				decl.warn(result, error);
			}
		});
	};
});
