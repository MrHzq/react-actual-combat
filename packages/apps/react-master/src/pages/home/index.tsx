import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/navigation";

type Props = {};

export default function Home({}: Props) {
	return (
		<div>
			<Navigation />
			<Outlet />
		</div>
	);
}
