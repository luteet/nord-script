import headerScroll from "./header-scroll.js";
import pin from "./pin.js";
import sliders from "./sliders.js";
import Popup from "./popup.js";

const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageAspectRatio = document.querySelectorAll('.image-aspect-ratio, figure img');
imageAspectRatio.forEach(imageAspectRatio => {
	if(imageAspectRatio.getAttribute('width') && imageAspectRatio.getAttribute('height'))
		imageAspectRatio.style.setProperty('--aspect-ratio', `${imageAspectRatio.getAttribute("width")}/${imageAspectRatio.getAttribute("height")}`);
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <click-events> -=-=-=-=-=-=-=-=-=-=-=-=

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}


	// =-=-=-=-=-=-=-=-=-=-=-=- <menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=
	
	if ($('.header__burger')) {
	
		menu.forEach(element => {
			element.classList.toggle('is-mobile-menu-active')
		})
	
	}

	const headerNavBackground = $(".header__nav_background, .header__nav_close")
	if(headerNavBackground) {
	
		menu.forEach(element => {
			element.classList.remove('is-mobile-menu-active')
		})
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll-on-click-to-section> -=-=-=-=-=-=-=-=-=-=-=-=
	
	let scrollTo = $('.scroll-to');
	if(scrollTo) {
		event.preventDefault();
		let section;
	
		section = document.querySelector(scrollTo.getAttribute('href'))
	
		menu.forEach(elem => {
			elem.classList.remove("is-mobile-menu-active")
		})
	
		if(section) {
			//section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
			window.scroll({
				left: 0, top: section.offsetTop - header.offsetHeight, behavior: "smooth"
			})
		} else {
			body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll-on-click-to-section on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

	

})

// =-=-=-=-=-=-=-=-=-=-=-=- </click-events> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize = 0, aboutSection = document.querySelector(".about"), aboutOffsetTop;

function resize() {

	header && !header.classList.contains("is-fixed") && html.style.setProperty("--height-header", header.offsetHeight + "px");
	!body.classList.contains("is-mobile-menu-active") && html.style.setProperty("--size-scrollbar", window.innerWidth - body.offsetWidth + "px");

	html.style.setProperty("--vh", (window.innerHeight * 0.01).toFixed(2) + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", (window.innerHeight * 0.01).toFixed(2) + "px");
		if(aboutSection) aboutOffsetTop = aboutSection.offsetTop;
	}
	
	windowSize = window.innerWidth;
	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=

const popup = new Popup();

popup.init()

// =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <sliders> -=-=-=-=-=-=-=-=-=-=-=-=

sliders({aboutOffsetTop});

// =-=-=-=-=-=-=-=-=-=-=-=- </sliders> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

headerScroll();

pin({header});

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=


document.querySelectorAll(".feedback-popup__communication-input").forEach(input => {

	const checkbox = input.closest(".feedback-popup__communication").querySelector(".feedback-popup__communication-checkbox input");

	input.addEventListener("focus", () => {
		checkbox.checked = true;
	})
})

document.querySelector(".feedback-popup__form").addEventListener("submit", (event) => {
	event.preventDefault();
})

/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=
*/
