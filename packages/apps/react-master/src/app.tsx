import React from "react";
import { HashRouter, useRoutes } from "react-router-dom";
import { router } from "./router";
import { Performance } from "./utils/lib/apis";

type Props = {
	name?: string;
};

// 放在 App 外面，防止每次渲染都重新生成
const Routers = () => useRoutes(router);

Performance.init();

export default function App({}: Props) {
	return (
		<HashRouter>
			<Routers />
		</HashRouter>
	);
}
