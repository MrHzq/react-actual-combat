import { BaseTrack, UserTrackData } from "./track";

// 性能上报
export class Performance {
	static readonly timing = window.performance && window.performance.timing;

	static init() {
		if (!this.timing) {
			console.warn("performance is not support");
		}

		window.addEventListener("load", () => {
			const data = this.getTiming();

			new BaseTrack().track(data);
		});
	}
	static getTiming(): UserTrackData {
		const timing = this.timing;

		return {
			type: "performance",
			data: {
				loadTime: timing.loadEventEnd - timing.navigationStart,
				domReadyTime: timing.domComplete - timing.domLoading,
				readyTime: timing.domContentLoadedEventEnd - timing.navigationStart,
				requestTime: timing.responseEnd - timing.requestStart,
			},
		};
	}
}
// 主动上报
const t = new BaseTrack();
export const sendLog = <T>(data: T) => {
	t.track(data as T & UserTrackData);
};
