export default function pin(e={}){gsap.registerPlugin(ScrollTrigger),ScrollTrigger.config({ignoreMobileResize:!0});const r=document.querySelector(".our-approach").querySelectorAll(".our-approach__col"),t=!!e.header&&e.header;let o,i=0;const l=r[2].querySelector(".our-approach__list");function n(){ScrollTrigger.killAll(),o&&o.kill(),window.innerWidth>=992&&(o=gsap.timeline(),o.to(r[0],{scrollTrigger:{trigger:r[0],pin:!0,pinSpacing:!1,scrub:!0,start:()=>`-=${i} top`,end:()=>l.offsetHeight+" bottom"}}),o.to(r[1],{transform:`translateY(-${r[1].querySelector(".our-approach__gallery").offsetHeight+i-window.innerHeight}px)`,scrollTrigger:{trigger:r[1],pin:!0,pinSpacing:!1,scrub:!0,start:()=>`-=${i} top`,end:()=>l.offsetHeight+" bottom"}}))}t&&(i=t.offsetHeight),n(),window.addEventListener("resize",()=>n())}