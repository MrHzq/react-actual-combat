import { Controller, RequestMapping, RequestMethod } from "../utils/decorator";

@Controller("/book")
export default class BookController {
	@RequestMapping(RequestMethod.GET, "/all")
	async getAll(ctx) {
		ctx.body = {
			code: 200,
			msg: "success",
			data: ["1", "2"],
		};
	}
}
