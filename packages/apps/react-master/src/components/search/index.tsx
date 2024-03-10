import React, {
	ChangeEventHandler,
	FocusEventHandler,
	Fragment,
	KeyboardEventHandler,
	useRef,
	useState,
} from "react";

import { Button } from "@hzq/react-x-components";
import { localStore } from "../../utils/store/index.js";

type Props = {};

export default function Search({}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	// 下拉框的数据
	const [relatedList, setRelatedList] = useState<string[]>([]);

	// 是否展示下拉框
	const [isShow, setIsShow] = useState<boolean>(false);

	// 输入框内容
	const [inputValue, setInputValue] = useState<string>("");

	// 当前选择的数据下标
	const [selectedIdx, setSelectedIdx] = useState<number>(-1);

	const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
		// 获取历史记录数据
		setRelatedList(
			// @ts-ignore
			(localStore.get("searchHistoryList") || [])
				.reduce((setArr: string[], item: string) => {
					return setArr.includes(item) ? setArr : [...setArr, item];
				}, [])
				.filter((item: string) => Boolean(item))
				.filter(
					(item: string) =>
						!e.target.value ||
						(e.target.value && item.includes(e.target.value)),
				)
				.slice(0, 5),
		);

		setIsShow(true);
	};

	const handleBlur = () => {
		setIsShow(false);
	};

	const handleChangge: ChangeEventHandler<HTMLInputElement> = (e) => {
		setInputValue(e.target.value);
		setSelectedIdx(-1);
		handleFocus(e as any);
	};

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		console.log("[ handleKeyDown ] >");
		switch (e.key) {
			case "Enter": {
				// 监听回车事件
				const currentValue =
					selectedIdx !== -1 ? relatedList[selectedIdx] : inputValue;

				// 将值放到输入框内
				setInputValue(currentValue);

				// @ts-ignore
				localStore.unshift("searchHistoryList", currentValue);

				setIsShow(false);

				break;
			}
			case "ArrowUp": {
				// 监听上箭头事件
				if (relatedList.length) {
					if (selectedIdx < 1) {
						setSelectedIdx(relatedList.length - 1);
					} else {
						setSelectedIdx((idx: number) => idx - 1);
					}
				}
				break;
			}
			case "ArrowDown": {
				// 监听下箭头事件
				if (relatedList.length) {
					if (selectedIdx === relatedList.length - 1) {
						setSelectedIdx(0);
					} else {
						setSelectedIdx((idx: number) => idx + 1);
					}
				}
				break;
			}

			default:
				break;
		}
	};

	const handleSearchBtnClick = () => {
		const currentValue = inputValue || inputRef.current?.placeholder;

		console.log("[ currentValue ] >", currentValue);

		// 将值放到输入框内
		setInputValue(currentValue!);

		// @ts-ignore
		localStore.unshift("searchHistoryList", currentValue);

		setIsShow(false);
	};

	return (
		// Fragment 内置组件，用于在 JSX 中返回多个元素而不必包裹在一个额外的 HTML 元素中。
		<Fragment>
			<div className=" flex items-center">
				<input
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleChangge}
					onKeyDown={handleKeyDown}
					ref={inputRef}
					value={inputValue}
					type="text"
					className=" w-98 h-8 border border-gray-100 px-4 rounded-full bg-gray-50"
					placeholder="福建软考报名入口"
				/>
				<Button onClick={handleSearchBtnClick}>提问111</Button>
			</div>
			{relatedList?.length && isShow ? (
				<div
					className="fixed top-16 w-96 z-10 bg-white border h-auto"
					style={{ left: inputRef.current?.getBoundingClientRect()?.x }}
				>
					{relatedList.map((item, idx) => {
						return (
							<div
								key={idx}
								className={`mb-2 last:mb-0 py-2 px-4 hover:bg-gray-100 cursor-pointer flex justify-between hover:*:flex ${idx === selectedIdx ? "bg-gray-100 text-blue-400" : ""}`}
							>
								<span>{item}</span>
								<span className="text-gray-500 text-sm hidden">X</span>
							</div>
						);
					})}
				</div>
			) : (
				<></>
			)}
		</Fragment>
	);
}
