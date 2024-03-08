import React from "react";

type Props = {};

export default function Search({}: Props) {
	return (
		<div className=" flex items-center">
			<input
				type="text"
				className=" w-98 h-8 border border-gray-100 px-4 rounded-full bg-gray-50"
				placeholder="福建软考报名入口"
			/>
			<button className=" w-16 h-8 mx-4 text-sm bg-blue-500 text-white flex justify-center items-center rounded-full hover:bg-blue-800 transition-all">
				提问
			</button>
		</div>
	);
}
