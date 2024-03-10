import ReactDOM from "react-dom/client";
import React from "react";

import App from "./app";

import "./index.less";

import setupLocatorUI from "@locator/runtime";

if (process.env.NODE_ENV === "development") {
	setupLocatorUI();
}

ReactDOM.createRoot(document.getElementById("app") as Element).render(<App />);
