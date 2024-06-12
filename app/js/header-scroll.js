export default function headerScroll() {

	const header = document.querySelector('.header');
	let top = [window.scrollY, false];

	header.classList.add('is-init');

	function scroll() {
		top[0] = window.scrollY;

		if(top[0] <= 0) {
			if(!header.classList.contains("on-top")) {
				header.classList.add("on-top");
			}
		} else if(header.classList.contains("on-top")) {
			header.classList.remove("on-top");
		}

		if (top[0] >= 300 && top[1] == false) {

			top[1] = true;
			header.style.setProperty('--opacity', '0');

			setTimeout(function () {
				header.classList.add('is-fixed');
				header.style.setProperty('--opacity', '1');
				document.documentElement.style.setProperty("--fixed-header-height", header.offsetHeight + "px");
			}, 200);

		} else if (top[0] <= 300 && top[1] == true) {

			top[1] = false;
			header.style.setProperty('--opacity', '0');

			setTimeout(function () {
				header.style.setProperty('--opacity', '1');
				header.classList.remove('is-fixed');
			}, 200);

		}
	}

	scroll();

	window.addEventListener("scroll", scroll);

}
