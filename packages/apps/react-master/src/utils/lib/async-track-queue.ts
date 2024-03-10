// 第二层：AsyncTrackQueue 是专门处理收集工作的

import { debounce } from "lodash";

interface RequiredData {
	timestamp: number | string;
}

// 思考 2：如何收集？收集多少？怎么发请求？
export abstract class AsyncTrackQueue<T extends RequiredData> {
	_queueData: Array<T> = [];

	// 获取本次存储服务
	private get storageService() {
		return TaskQueueStorableHelper.getInstance();
	}

	private get queueData(): Array<T> {
		return this.storageService.queueData;
	}

	private set queueData(data: Array<T>) {
		this.storageService.queueData = data;

		if (data.length) {
			this.debounceRun();
		}
	}

	// 添加任务
	addTask(data: T | Array<T>) {
		this.queueData = this.queueData.concat(data);
	}

	// 消费埋点请求任务队列，需要子类去实现
	protected abstract comsumeTaskQuene(data: Array<T>): Promise<unknown>;

	// 上报策略：当一段时间内，没有新增的任务时，可以去上报一波
	// 通过 debounce 防抖，来控制上报频率
	protected debounceRun = debounce(this.run.bind(this), 500);

	private run() {
		const currentDataList = this.queueData;

		if (currentDataList.length) {
			// 清空任务
			this.queueData = [];
			// 执行任务
			this.comsumeTaskQuene(currentDataList);
		}
	}
}

// 思考 3：当还有数据未上报时，用户关闭了浏览器，那就会丢失一部分待上报的埋点数据，如何解决这个问题？
// 答案 3：使用 localStorage 存储，当用户关闭浏览器时，将数据存到 localStorage 中，下次打开浏览器时，再从 localStorage 中读取数据上报
class TaskQueueStorableHelper<T extends RequiredData = any> {
	// 一个单例模式

	private static instance: TaskQueueStorableHelper | null = null;

	static getInstance<T extends RequiredData = any>() {
		if (!this.instance) {
			this.instance = new TaskQueueStorableHelper();
		}
		return this.instance;
	}

	private STORAGE_KEY = "track-queue";

	protected store: any = null;

	// 打开浏览器时，是要执行 constructor
	constructor() {
		const localStorageVal = localStorage.getItem(this.STORAGE_KEY);

		if (localStorageVal) {
			// 说明有待上报的数据，则存储一些
			try {
				this.store = JSON.parse(localStorageVal);
			} catch (error: any) {
				throw new Error(error);
			}
		}
	}

	get queueData() {
		return this.store?.queueData || [];
	}

	set queueData(data: Array<T>) {
		this.store = {
			...this.store,
			queueData: data.sort((a, b) => Number(a.timestamp) - Number(b.timestamp)),
		};

		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.store));
	}
}
