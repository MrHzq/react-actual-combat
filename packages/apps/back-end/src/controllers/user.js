import { Controller, RequestMapping, RequestMethod } from "../utils/decorator";

@Controller("/user")
export default class UserController {
	@RequestMapping(RequestMethod.POST, "/login")
	async login(ctx) {
		ctx.body = "登录成功";
	}
}
