const events = {};

class Core {
	context = {};

	defaultOpts = {
		beforeCreate() {
			console.log("beforeCreate");
		},
		created() {
			console.log("created");
		},

		beforeMount() {
			console.log("beforeMount");
		},
		mounted() {
			console.log("mounted");
		},

		beforeDistory() {
			console.log("beforeDistory");
		},
		distoryed() {
			console.log("distoryed");
		},
	};

	constructor(opts) {
		this.opts = { ...this.defaultOpts, ...opts };
	}

	addPlugin({ type, run }) {
		events[type] = events[type] || [];
		events[type].push(run);
	}

	pluginsRun(type) {
		events[type].forEach((fn) => fn(this.context));
	}

	start() {
		this.opts.beforeCreate(); // 模拟生命周期
		this.pluginsRun("create");
		this.opts.created(); // 模拟生命周期

		this.opts.beforeMount(); // 模拟生命周期
		this.pluginsRun("mount");
		this.opts.mounted(); // 模拟生命周期
	}

	end() {
		this.opts.beforeDistory(); // 模拟生命周期
		this.pluginsRun("distory");
		this.opts.distoryd(); // 模拟生命周期
	}
}

// export default Core;

// 用户使用
const core = new Core({
	beforeCreate() {
		console.log("[ this is my beforeCreate] >");
	},
	mounted() {
		console.log("[ this is my mounted] >");
	},
	// ......
});

core.addPlugin({
	type: "create",
	run(context) {
		console.log("[ create run 1 ] >");
		context.xxxx = "xxxx";
	},
});

core.addPlugin({
	type: "create",
	run(context) {
		console.log("[ create run 2 ] >");
		console.log("[ create run 2 context ] >", context);
		context.yyyy = "yyyy";
	},
});

core.addPlugin({
	type: "mount",
	run(context) {
		console.log("[ mount context ] >", context);
	},
});

core.start();
