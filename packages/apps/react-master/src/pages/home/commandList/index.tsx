import React, { FC, MouseEventHandler, useRef, useState } from "react";
import { useRefInsObsState } from "./useRefInsObsState";

type Props = {};

interface ICommandItem {
	key: string;
	item: any;
}
const CommandData: FC<ICommandItem> = ({ item }) => {
	const [selected, setSelected] = useState(false);

	const handleClick: MouseEventHandler<Element> = (event) => {
		event.preventDefault();
		setSelected(!selected);
	};

	return (
		<div className=" flex flex-col items-start p-4 border-b">
			{/* 标题部分 */}
			<div className=" flex h-auto">
				<a className=" font-bold text-lg leading-10">
					{item?.target?.question?.title || item?.target?.title}
				</a>
			</div>

			{/* 文章卡片 */}
			{selected ? (
				<div dangerouslySetInnerHTML={{ __html: item?.target?.content }} />
			) : (
				<a
					href="/"
					onClick={handleClick}
					className=" cursor-pointer hover:text-gray-600 text-gray-800"
				>
					{item?.target?.excerpt?.substring(0, 80) + "..."}
					<span className=" text-sm leading-7 text-blue-500 ml-2">
						阅读全文 &gt;
					</span>
				</a>
			)}

			{/* 底部 bar */}
			<div
				className={`flex justify-between items-center p-3 bg-white w-full ${selected ? " bottom-0 left-0 shadow-sm border-t sticky" : ""}`}
			>
				<div className=" flex items-center flex-1">
					<div
						className="
                        flex justify-center items-center h-8 px-4 bg-blue-100 text-sm text-blue-600 rounded-sm  cursor-pointer hover:bg-blue-200 transition-all"
					>
						赞同 {item?.target?.thanks_count || 0}
					</div>
					<div className=" flex justify-center items-center h-8 px-4 bg-blue-100 text-sm text-blue-600 rounded-sm  cursor-pointer hover:bg-blue-200 transition-all ml-2">
						踩
					</div>
					<div className=" flex items-center flex-1 gap-8 text-gray-400 text-sm ml-8">
						<div>{item?.target?.comment_count} 评论</div>
						<div>收藏</div>
						<div>举报</div>
						<div>...</div>
					</div>
				</div>
				{selected && (
					<div>
						<span
							className=" text-gray-500 text-sm cursor-pointer"
							onClick={handleClick}
						>
							收起
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default function CommandList({}: Props) {
	const scrollRef = useRef<HTMLDivElement>(null);

	const list = useRefInsObsState(scrollRef);

	return (
		<div className=" flex flex-col border-t">
			{list.map((item, idx) => (
				<CommandData key={item.id + idx} item={item} />
			))}
			<div ref={scrollRef} className=" h-auto">
				<svg
					width="656"
					height="108"
					viewBox="0 0 656 108"
					className="w-full text-gray-100"
				>
					<path
						d="M0 0h656v108H0V0zm0 0h350v12H0V0zm20 32h238v12H20V32zM0 32h12v12H0V32zm0 32h540v12H0V64zm0 32h470v12H0V96z"
						fill="currentColor"
						fillRule="evenodd"
					></path>
				</svg>
			</div>
		</div>
	);
}
