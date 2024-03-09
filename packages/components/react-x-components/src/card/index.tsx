import React, { ReactNode } from "react";

type Props = {
	className?: string;
	children?: ReactNode;
};

export default function Card({ className, children }: Props) {
	return (
		<div
			className={` bg-white border border-gray-200 m-2 rounded-sm shadow-md ${className}`}
		>
			{children}
		</div>
	);
}
