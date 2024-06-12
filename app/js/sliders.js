export default function sliders(args={}) {

	const header = document.querySelector(".header");
	
	document.querySelectorAll(".about").forEach(about => {

		const navSliderEl = about.querySelector(".about__nav-inner"),
		navSliderSlides = about.querySelectorAll(".about__nav-item");

		const navSlider = new Splide(navSliderEl, {
		
			type: "loop",
			perPage: 3,
			perMove: 1,
			
			arrows: false,
			pagination: false,
			isNavigation: true,
			//updateOnMove: true,
	
		});

		about.querySelectorAll(".about__nav-arrow").forEach(arrow => {
			arrow.addEventListener("click", () => {
				if(arrow.classList.contains("to-prev")) navSlider.go("<");
				if(arrow.classList.contains("to-next")) navSlider.go(">");
			})
		})

		const mainSlider = new Splide(about.querySelector(".about__slider"), {
		
			type: "fade",
			rewind: true,
			drag: false,

			arrows: false,
			pagination: false,
	
			//updateOnMove: true,
	
		});

		mainSlider.sync(navSlider);
		mainSlider.mount();
		navSlider.mount();

		const mobSlider = new Splide(about.querySelector(".about__mob-slider"), {
		
			type: "fade",
			rewind: true,
			drag: false,
			
			arrows: false,
			pagination: false,
	
		});

		mobSlider.on('active', function (event) {
           event.slide.parentElement.style.height = event.slide.offsetHeight + 'px';
        })

		about.querySelectorAll(".about-mob-slide__item").forEach(item => {
			item.addEventListener("click", () => {
				mobSlider.go(Number(item.dataset.index))
				let heightHeader = (header) ? header.offsetHeight : 0;
				if(args.aboutOffsetTop) {
					/* window.scroll({
						left: 0, top: args.aboutOffsetTop - heightHeader, behavior: "smooth",
					}) */
					setTimeout(() => about.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" }), 100)
					//item.closest(".splide__list").style.height = item.closest(".splide__slide").offsetHeight + 'px';
				}
				
			})
		})
		
	
		mobSlider.mount();

		/* mainSlider.on('slideChange', function (slider) {
			//console.log(index);
			navSlider.slideTo(slider.activeIndex)
		});

		navSlider.on('transitionEnd', function (slider) {
			mainSlider.slideTo(slider.activeIndex)
		}); */

		//navSlider.controller.control = mainSlider;
		//mainSlider.controller.control = navSlider;

		/* navSliderSlides.forEach((slide, index) => {
			slide.addEventListener("click", () => {
				navSlider.slideTo(slide.dataset.swiperSlideIndex);
			})
		}) */
	})

	document.querySelectorAll('.workflow__slider').forEach(sliderElement => {
	
		const slider = new Splide(sliderElement, {
	
			perPage: 5,
			perMove: 1,

			arrows: false,
			gap: "0.3125rem",
	
			breakpoints: {
				1400: {
					perPage: 3,
				},
	
				992: {
					perPage: 2,
				},

				550: {
					perPage: 1,
				}
			}
	
		});

		let paginationButtons = false;
		const arrow = sliderElement.querySelector(".workflow__arrow");

		slider.on("active", () => {
			if(paginationButtons) {
				if(paginationButtons[paginationButtons.length-1].classList.contains("is-active")) {
					arrow.classList.add("to-back");
				}
				if(slider.index == 0) {
					arrow.classList.remove("to-back");
				}
			}
		})

		slider.on("pagination:updated", () => {
			setTimeout(() => paginationButtons = sliderElement.querySelectorAll(".splide__pagination li button"),100)
		})

		arrow.addEventListener("click", () => {
			if(arrow.classList.contains("to-back")) {
				slider.go("<");
			} else {
				slider.go(">");
			}
			
		})
	
		slider.mount();
		paginationButtons = sliderElement.querySelectorAll(".splide__pagination li button");
		
	
	})
}