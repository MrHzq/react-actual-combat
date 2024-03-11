// 这个是埋点 API

import { AsyncTrackQueue } from "./async-track-queue";

export interface TrackQueue {
	seqId: number;
	id: number;
	timestamp: number;
}

export interface UserTrackData {
	type: string;
	data: any;
}

// 思考 1：每次调用时是否立马发起请求？
// 答案 1：不一定，比如滚动了页面，那可能存在几十个埋点请求，所以应该先收集一波，然后统一发送。这样服务器的 QPS 会减少

export class BaseTrack extends AsyncTrackQueue<TrackQueue> {
	private seq = 0;
	/**
	 * 埋点请求收集
	 *
	 * @param data 用户轨迹数据
	 */
	track(data: UserTrackData) {
		// 埋点请求收集
		this.addTask({
			id: Math.random(),
			seqId: this.seq++,
			timestamp: Date.now(),
			...data,
		});
	}

	/**
	 * 消费埋点请求任务队列
	 *
	 * @param data 任务队列数据，类型为任意类型数组
	 * @returns 返回一个 Promise，当 img 标签加载完成后 resolve 为 true
	 */
	comsumeTaskQuene(data: Array<TrackQueue>) {
		return new Promise((resolve) => {
			// 通过构建一个 img 标签，然后设置 src 属性，来发送请求
			const image = new Image();
			image.src = "http://localhost:3001/track?data=" + JSON.stringify(data);

			console.log("[ comsumeTaskQuene data ] >", data);

			image.onload = () => {
				resolve(true);
			};
		});
	}
}
