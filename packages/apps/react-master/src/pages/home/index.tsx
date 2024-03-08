import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

export default function Home({}: Props) {
	return (
		<div>
			<div className="flex gap-4 text-blue-500	underline">
				<a href="">首页</a>
				<a href="#education">知乎知学堂</a>
				<a href="#explore">发现</a>
				<a href="#question">等你来答</a>
			</div>
			<div>
				首页 page 自身内容
				<div>
					<div className="flex gap-4 text-blue-500	underline">
						<a href="#command">command</a>
						<a href="#follow">follow</a>
						<a href="#hot">hot</a>
						<a href="#zvideo">zvideo</a>
					</div>
					首页二级菜单内容
					<Outlet />
				</div>
			</div>
		</div>
	);
}
