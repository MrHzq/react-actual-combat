import Koa from "koa";

import Router from "koa-router";

import Routers from "./controllers/index"; // 导入 controllers 作为路由

import { controllers } from "./utils/decorator.js"; // 导入 controllers，里面有具体的 method, path, handler

const app = new Koa();

app.use(async (ctx, next) => {
	ctx.set("Acess-Control-Allow-Origin", "*"); // 允许与给定的来源（origin）共享。
	ctx.set(
		"Access-Control-Allow-Headers",
		"Content-Type,Content-Length,Authorization,Accept,X-Requested-With",
	); // 允许的请求头。

	ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE"); // 允许使用的方法或方法列表。

	ctx.set("Content-Type", "application/json"); // 设置响应的 Content-Type 头，与跨域无关，只是放在一起写了

	if (ctx.request.method === "OPTIONS") {
		ctx.status = 200; // 状态码为 200，表示请求成功
	} else await next();
});

const router = new Router();

const allPath = [];

Routers.forEach((route) => {
	const currRoute = controllers.find((item) => item.constructor === route);

	if (!currRoute) return;

	let { method, path, handler } = currRoute;

	const { prefix } = route;

	if (prefix) path = prefix + path;

	allPath.push({ method, path });

	router[method](path, handler);
});

router.get("/", async (ctx) => {
	let body = "";

	allPath.forEach((item) => {
		body += `<a href='${item.path}'>${item.method}: ${item.path}</a><br>`;
	});

	ctx.body = body;
});

app.use(router.routes());

const port = 3001;

app.listen(port, () => {
	console.log(`server is running at http://localhost:${port}`);
});
