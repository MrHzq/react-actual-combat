import React, { FC, useEffect, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";

export const tabs = [
	{
		title: "关注",
		path: "/follow",
	},
	{
		title: "推荐",
		path: "/",
	},
	{
		title: "热榜",
		path: "/hot",
	},
	{
		title: "视频",
		path: "/zvideo",
	},
];

type TabProps = {
	activeStyle?: string;
};

export const Tab: FC<TabProps> = ({ activeStyle }) => (
	<div className=" flex mx-6 box-border">
		{tabs.map((item) => (
			<NavLink
				key={item.path}
				to={item.path}
				className={({ isActive }) =>
					" whitespace-nowrap py-4 mx-4 text-base transition-all " +
					(isActive
						? "text-blue-600 font-bold " + activeStyle
						: "text-black hover:text-blue-700")
				}
			>
				{item.title}
			</NavLink>
		))}
	</div>
);

type Props = {
	className?: string;
	onChange?: (bool: boolean) => void;
};

export default function Tabs({ onChange }: Props) {
	const scrollRef = useRef<HTMLDivElement>(null);

	// 当这个 ref 的 div 到顶后，则进行吸顶处理

	// 判断到顶
	// 1、getBoundingClientRect 获取到元素的位置信息，然后计算
	// 2、IntersectionObserver 监听元素进入可视区域
	useEffect(() => {
		let intersectionObserver: IntersectionObserver | undefined =
			new IntersectionObserver((entries) => {
				// 当进入可视区域内时，执行一次，entries[0]?.isIntersecting 为 true
				// 当离开可视区域内时，执行一次，entries[0]?.isIntersecting 为 false
				// 所以当为 false 时处理吸顶
				onChange?.(entries[0]?.isIntersecting);
			});

		scrollRef.current && intersectionObserver.observe(scrollRef.current);

		return () => {
			scrollRef.current && intersectionObserver!.unobserve(scrollRef.current);

			intersectionObserver = undefined;
		};
	}, []);

	return (
		<div className=" w-full">
			<div ref={scrollRef}></div>
			<Tab />
			<Outlet />
		</div>
	);
}
