import Koa from "koa";

import Router from "koa-router";

const app = new Koa();

const router = new Router();

router.get("/", async (ctx) => {
	ctx.body = "hello koa 3";
});

router.get("/list", async (ctx) => {
	ctx.body = ["1", "2"];
});

app.use(router.routes());

const port = 3001;

app.listen(port, () => {
	console.log(`server is running at http://localhost:${port}`);
});
