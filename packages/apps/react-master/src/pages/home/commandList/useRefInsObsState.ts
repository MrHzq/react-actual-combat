import { RefObject, useState } from "react";
import { useRefInsObsEffect } from "./useRefInsObsEffect";

import { mockList } from "./mock";

const fetchList = () =>
	new Promise<Array<any>>((resolve) => {
		setTimeout(() => {
			resolve(mockList.slice(5, 10));
		}, 1000);
	});

export function useRefInsObsState(scrollRef: RefObject<HTMLDivElement>) {
	const [list, setList] = useState(mockList.slice(0, 5));

	useRefInsObsEffect((isIntersecting) => {
		if (isIntersecting) {
			// 加载更多数据
			fetchList().then((res: Array<any>) => {
				setList((list) => [...list, ...res]);
			});
		}
	}, scrollRef);

	return list;
}
