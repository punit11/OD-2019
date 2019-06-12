import $ from "jquery";
import {owlCarousel} from "owl.carousel";


 // Initialise and bind owl carousel
function bind_owl() {
  console.log("owl binding started");
let course_cards_len = $(".course-info-carousel .eventcard").length;
let tours_cards_len = $(".tours-exp-carousel .eventcard").length;
let gen_info_cards_len = $(".gen-info-carousel .eventcard").length;

  var owl = $('.owl-carousel');
  
  owl.removeClass("owl-hidden");
  owl.owlCarousel('destroy'); // Kill owl first on click before re-init
  owl.fadeIn('slow'); // Unhide cards before re-init
  $(".course-info-carousel").owlCarousel({
    stagePadding: 20,
    margin: 10,
    nav: true,
    // loop:true,
    rewindNav:false,
    lazyLoad:true,
    lazyContent:true,
		responsive: {
			0: {items: 1},
			600: {items: 2},
			1000: {items: 3.5,
            loop:(course_cards_len > 3) ? true: false,
            dotsEach: (course_cards_len > 3) ? 3: 1,
            slideBy: (course_cards_len > 3) ? 3: 1
			}
		}
  });

  $(".tours-exp-carousel").owlCarousel({
    stagePadding: 20,
    margin: 10,
    nav: true,
    // loop:true,
    rewindNav:false,
    lazyLoad:true,
    lazyContent:true,
		responsive: {
			0: {items: 1},
			600: {items: 2},
			1000: {items: 3.5,
            loop:(tours_cards_len > 3) ? true: false,
            dotsEach: (tours_cards_len > 3) ? 3: 1,
            slideBy: (tours_cards_len > 3) ? 3: 1

			}
		}
  });

  $(".gen-info-carousel").owlCarousel({
    stagePadding: 20,
    margin: 10,
    nav: true,
    // loop:true,
    rewindNav:false,
    lazyLoad:true,
    lazyContent:true,
		responsive: {
			0: {items: 1},
			600: {items: 2},
			1000: {items: 3.5,
            loop:(gen_info_cards_len > 3) ? true: false,
            dotsEach: (gen_info_cards_len > 3) ? 3: 1,
            slideBy: (gen_info_cards_len > 3) ? 3: 1
			}
		}
  });
} // end owl bind

export default bind_owl;