import $ from "jquery";
import {owlCarousel} from "owl.carousel";


 // Initialise and bind owl carousel
function bind_owl() {
  console.log("owl binding started");
let course_cards_len = $(".course-info-carousel .eventcard").length;
let tours_cards_len = $(".tours-exp-carousel .eventcard").length;
let gen_info_cards_len = $(".gen-info-carousel .eventcard").length;

  var owl = $('.owl-carousel');

  // $(document).on('click','.owl-nav button', function(event) {
  //   console.log('owl carousel change');
  //   $('.owl-item.active.fadeOut').removeClass('fadeOut');
  //     var activeEls = $('.owl-item.active').eq(2); 
  //     activeEls.addClass('fadeOut'); 
  // });

  // $(document).on('click', '.owl-nav button', function(event) {
  //   fadeTile();
  // });


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
			1000: {items: 2.5,
            loop:(course_cards_len > 2) ? true: false,
            dotsEach: (course_cards_len > 2) ? 2: 1,
            slideBy: (course_cards_len > 2) ? 2: 1
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
			1000: {items: 2.5,
            loop:(tours_cards_len > 2) ? true: false,
            dotsEach: (tours_cards_len > 2) ? 2: 1,
            slideBy: (tours_cards_len > 2) ? 2: 1

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
			1000: {items: 2.5,
            loop:(gen_info_cards_len > 2) ? true: false,
            dotsEach: (gen_info_cards_len > 2) ? 2: 1,
            slideBy: (gen_info_cards_len > 2) ? 2: 1
			}
		}
  });
} // end owl bind

// $(function() {
// function fadeTile(event){
  // console.log('fadeTile function initialised');
  
  
  // $('.owl-carousel').on("ready", ".owl-stage .owl-item.active", function() {
  //   $('.owl-item.active.fadeOut').removeClass('fadeOut');
  // });
  // console.log('activeEls ', activeEls);
  // activeEls.addClass('fadeOut'); 
  // $( ".owl-carousel" ).each(function() {
  //   var activeEls = $('.owl-item.active').eq(2); 
  //   activeEls.addClass('fadeOut'); 
  //   console.log('activeEls ', activeEls);
  // });
// }
// fadeTile();
// });
export default bind_owl;