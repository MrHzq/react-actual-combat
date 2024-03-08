import React, {
	FC,
	MouseEventHandler,
	useEffect,
	useRef,
	useState,
} from "react";
import { mockList } from "./mock";

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

const fetchList = () =>
	new Promise<Array<any>>((resolve) => {
		setTimeout(() => {
			resolve(mockList.slice(5, 10));
		}, 500);
	});

export default function CommandList({}: Props) {
	const [list, setList] = useState(mockList.slice(0, 5));

	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let intersectionObserver: IntersectionObserver | undefined =
			new IntersectionObserver((entries) => {
				// 这个函数执行时，拿不到最新的 list
				const isIntersecting = entries[0]?.isIntersecting;

				if (isIntersecting) {
					// 加载更多数据
					fetchList().then((res: Array<any>) => {
						setList((list) => [...list, ...res]);

						// setList([...list, ...res]); 这样写，list 不会更新
					});
				}
			});

		scrollRef.current && intersectionObserver.observe(scrollRef.current);

		return () => {
			scrollRef.current && intersectionObserver!.unobserve(scrollRef.current);
			intersectionObserver = void 0;
		};
	}, []);

	return (
		<div className=" flex flex-col border-t">
			{list.map((item, idx) => (
				<CommandData key={item.id + idx} item={item} />
			))}
			<div ref={scrollRef}>loading......</div>
		</div>
	);
}
