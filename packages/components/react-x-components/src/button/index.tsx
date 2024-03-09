import React from "react";

type Props = {
	children: React.ReactNode;
	onClick?: () => void;
};

export default function Button({ children, onClick }: Props) {
	return (
		<button
			onClick={onClick}
			className=" w-16 h-8 mx-4 text-sm bg-blue-500 text-white flex justify-center items-center rounded-full hover:bg-blue-800 transition-all"
		>
			{children}
		</button>
	);
}
