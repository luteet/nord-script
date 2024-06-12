export default function pin(args={}) {
	
	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.config({ ignoreMobileResize: true });

	const ourApproach = document.querySelector(".our-approach");
	if(ourApproach) {
		const ourApproachCols = ourApproach.querySelectorAll(".our-approach__col");

		const header = args.header ? args.header : false;
		let headerHeight = 0;
		let mainTimeline;

		const list = ourApproachCols[2].querySelector(".our-approach__list");

		function animation() {
			ScrollTrigger.killAll();
			mainTimeline && mainTimeline.kill();
			if(window.innerWidth >= 992) {
				
				mainTimeline = gsap.timeline();
				mainTimeline.to(ourApproachCols[0], {
					//duration: 1,
					scrollTrigger: {
						trigger: ourApproachCols[0],
						pin: true,
						pinSpacing: false,
						scrub: true,
						start: () =>  `-=${headerHeight} top`,
						end: () => `${list.offsetHeight} bottom`,
					}
				})

				mainTimeline.to(ourApproachCols[1], {
					//duration: 5,
					transform: `translateY(-${ourApproachCols[1].querySelector(".our-approach__gallery").offsetHeight + headerHeight - window.innerHeight}px)`,
					scrollTrigger: {
						trigger: ourApproachCols[1],
						pin: true,
						pinSpacing: false,
						scrub: true,
						start: () =>  `-=${headerHeight} top`,
						end: () => `${list.offsetHeight} bottom`,
					}
				})

			}
		}

		if(header) headerHeight = header.offsetHeight;

		animation();
		window.addEventListener("resize", () => animation());
	}
}
