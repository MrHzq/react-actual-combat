import React from "react";
import "./app.css";
import styles from "./app2.module.less";

type Props = {};

export default function App({}: Props) {
	return (
		<div className={`hello ${styles.greenBGColor} flex justify-center`}>
			App
		</div>
	);
}
