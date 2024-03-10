/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{tsx,ts,jsx,js}"],
	theme: {
		extend: {},
		colors: {
			// 将默认的颜色改为变量
			white: "hzqTheme(--color-white)",
			black: "hzqTheme(--color-black)",
			gray: {
				50: "hzqTheme(--color-gray-50)",
				100: "hzqTheme(--color-gray-100)",
				200: "hzqTheme(--color-gray-200)",
				300: "hzqTheme(--color-gray-300)",
				400: "hzqTheme(--color-gray-400)",
				500: "hzqTheme(--color-gray-500)",
				600: "hzqTheme(--color-gray-600)",
				700: "hzqTheme(--color-gray-700)",
				800: "hzqTheme(--color-gray-800)",
				900: "hzqTheme(--color-gray-900)",
				950: "hzqTheme(--color-gray-950)",
			},
		},
	},
	plugins: [],
};
