import React from "react";
import Navigation from "../../components/navigation";
import Card from "../../components/card";
import Tabs from "./tabs";

type Props = {};

export default function Home({}: Props) {
	return (
		<div>
			<Navigation />
			<div className=" mx-auto max-w-6xl flex my-2 px-20">
				<Card className=" w-2/3">
					<Tabs />
				</Card>
				<div className=" flex-1 w-1/3">
					<Card className=" w-full">创作中心</Card>
					<Card className=" w-full">推荐关注</Card>
					<Card className=" w-full">其他功能</Card>
				</div>
			</div>
		</div>
	);
}
