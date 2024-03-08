import React from "react";
import { RouteObject } from "react-router-dom";

// 自己扩展的类型
export interface extraBizObject {
	title?: string;
	isShow?: boolean; // 是否显示
}

export const router: Array<RouteObject & extraBizObject> = [
	// https://www.zhihu.com/
	{
		path: "/",
		element: <div>home</div>,
		title: "首页",
		isShow: true,
		children: [
			{
				path: "/command",
				element: <div>command</div>,
			},

			{
				path: "/follow",
				element: <div>follow</div>,
			},

			{
				path: "/hot",
				element: <div>hot</div>,
			},

			{
				path: "/zvideo",
				element: <div>zvideo</div>,
			},
		],
	},
	// https://www.zhihu.com/education/learning
	{
		path: "/education",
		element: <div>education</div>,
		title: "知乎知学堂",
		children: [
			{
				path: "/learning",
				element: <div>learning</div>,
			},
		],
	},

	// https://www.zhihu.com/explore
	{
		path: "/explore",
		element: <div>explore</div>,
		title: "发现",
	},

	// https://www.zhihu.com/question/waiting
	{
		path: "/question",
		element: <div>question</div>,
		title: "等你来答",
		children: [
			{
				path: "/waiting",
				element: <div>waiting</div>,
			},
		],
	},
];
