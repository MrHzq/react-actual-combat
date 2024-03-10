import { Controller, RequestMapping, RequestMethod } from "../utils/decorator";

@Controller("/book")
export default class BookController {
	@RequestMapping(RequestMethod.GET, "/all")
	async getAll(ctx) {
		ctx.body = ["1", "2"];
	}
}
