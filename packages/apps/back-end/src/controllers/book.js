const {
	Controller,
	RequestMapping,
	RequestMethod,
} = require("../utils/decorator");

@Controller("/book")
export default class BookController {
	@RequestMapping(RequestMethod.GET, "/all")
	async getAll(ctx) {
		ctx.body = [];
	}
}
