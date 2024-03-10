/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{tsx,ts,jsx,js}"],
	theme: {
		extend: {},
		colors: {
			// 将默认的颜色改为变量
			white: "var(--color-white)",
			black: "var(--color-black)",
			gray: {
				50: "var(--color-gray-50)",
				100: "var(--color-gray-100)",
				200: "var(--color-gray-200)",
				300: "var(--color-gray-300)",
				400: "var(--color-gray-400)",
				500: "var(--color-gray-500)",
				600: "var(--color-gray-600)",
				700: "var(--color-gray-700)",
				800: "var(--color-gray-800)",
				900: "var(--color-gray-900)",
				950: "var(--color-gray-950)",
			},
		},
	},
	plugins: [],
};
