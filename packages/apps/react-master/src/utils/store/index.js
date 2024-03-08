/**
 * 一个本地存储库
 * 1. 初始化时可选择 localStorage、sessionStorage
 * 2. 若浏览器出现了异步问题、高频线程问题，也能解决
 * 3. 若本地存储有问题，可以降级处理
 * 4. 不用自己去解析 json，支持各种数组操作
 */
/**
 * 如何讲一个小工具封装到极致（过度设计）
 */

const CreateStore = function (
	unLocal = false,
	maxLength = 30,
	expireTime = NaN,
) {
	this.unLocal = unLocal;
	this.maxLength = maxLength;
	this.expireTime = expireTime;

	this.observe();
};

CreateStore.prototype.observe = function () {
	const context = this;
	this.__mock__storage = new Proxy(
		{},
		{
			get(target, propKey, receiver) {
				let result = Reflect.get(target, propKey, receiver);
				if (!this.unLocal) {
					// 存储在本地时，直接 getItem
					result = (context.getItem && context.getItem(propKey)) || void 0;

					// if (result !== Reflect.get(target, propKey, receiver)) {
					// 	throw new Error("数据不一致");
					// }
				}

				return result;
			},
			set(target, propKey, value, receiver) {
				let _value = value;

				// 数据处理
				if (value instanceof Array && value.length > context.maxLength) {
					_value = value.slice(0, context.maxLength); // 截取数据，多余丢弃
				}

				// 当 unLocal 为 false 时，在合适的时间将数据存储到本地
				if (!this.unLocal) {
					context.setItem && context.setItem(propKey, _value);
				}

				return Reflect.set(target, propKey, value, receiver);
			},
		},
	);
};

CreateStore.prototype.getItem = function (type) {
	if (!window) throw new Error("请在浏览器环境下运行");

	// 依赖反转：将操作抽象，不依赖于自己的实现，通过初始化时传入的storageMethod自行实现 getItem
	const data = window[this.storageMethod].getItem(type);

	let dataJson;
	try {
		dataJson = JSON.parse(data);
	} catch (error) {
		throw new Error(error);
	}

	return dataJson;
};

CreateStore.prototype.setItem = function (type, data) {
	if (!window) throw new Error("请在浏览器环境下运行");

	const dataJson = JSON.stringify(data);

	// 依赖反转：将操作抽象，不依赖于自己的实现，通过初始化时传入的storageMethod自行实现 setItem
	window[this.storageMethod].setItem(type, dataJson);
};

CreateStore.prototype.set = function (type, data) {
	this.__mock__storage[`${this.key}__${type}`] = data;
};

CreateStore.prototype.get = function (type) {
	return this.__mock__storage[`${this.key}__${type}`];
};

// 支持数组的方法
["pop", "push", "shift", "unshift", "reverse", "splice"].forEach((method) => {
	CreateStore.prototype[method] = function (type, ...rest) {
		// 当没有数组时，要用数组方法，直接初始化一个空数组
		if (!this.get(type)) this.set(type, []);

		if ((!this.get(type)) instanceof Array) throw new Error("必须为数组类型");

		const dataList = this.get(type);
		Array.prototype[method].apply(dataList, rest);
		this.set(type, dataList);
	};
});

const CreateLocalStorage = function (key, ...rest) {
	CreateStore.apply(this, rest);

	this.storageMethod = "localStorage";
	this.key = key;
};

CreateLocalStorage.prototype = Object.create(CreateStore.prototype);
CreateLocalStorage.prototype.constructor = CreateLocalStorage;

const CreateSessionlStorage = function (key, ...rest) {
	CreateStore.apply(this, rest);

	this.storageMethod = "sessionlStorage";
	this.key = key;
};

CreateSessionlStorage.prototype = Object.create(CreateStore.prototype);
CreateSessionlStorage.prototype.constructor = CreateSessionlStorage;

export const localStore = new CreateLocalStorage("local");
