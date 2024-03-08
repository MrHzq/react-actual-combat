import { RefObject, useEffect } from "react";

export function useRefInsObsEffect(
	fn: (b: boolean) => void,
	scrollRef: RefObject<HTMLDivElement>,
) {
	useEffect(() => {
		let intersectionObserver: IntersectionObserver | undefined =
			new IntersectionObserver((entries) => {
				fn(entries[0]?.isIntersecting);
			});

		scrollRef.current && intersectionObserver.observe(scrollRef.current);

		return () => {
			scrollRef.current && intersectionObserver!.unobserve(scrollRef.current);
			intersectionObserver = void 0;
		};
	}, []);
}
