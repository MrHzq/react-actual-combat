const { themeGroup, defaultTheme } = require("./themeGroup");
module.exports = {
	plugins: [
		"autoprefixer", // 自动添加浏览器前缀
		"tailwindcss",
		"postcss-nested",
		"postcss-nesting",
		require("./themePlugin")({ themeGroup, defaultTheme }),
	],
};
