export const RequestMethod = {
	GET: "get",
	POST: "post",
	PUT: "put",
	DELETE: "delete",
};

export const controllers = [];

export function Controller(prefix = "") {
	return function (constructor) {
		constructor.prefix = prefix;
	};
}

export function RequestMapping(method = "", url = "") {
	return function (target, propertyKey, decriptor) {
		let path = url || `/${propertyKey}`;

		const item = {
			method,
			path,
			handler: decriptor.value, // 函数自身
			constructor: target.constructor, // 构造函数
		};

		controllers.push(item);
	};
}
