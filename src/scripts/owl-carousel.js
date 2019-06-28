import $ from "jquery";
import {owlCarousel} from "owl.carousel";


 // Initialise and bind owl carousel
function bind_owl() {
  "use strict";
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
    rewindNav:false,
    lazyLoad:true,
    lazyContent:true,
		responsive: {
			0: {items: 1},
			600: {items: 2},
			1000: {items: 2.5,
            loop:(course_cards_len > 2) ? true : false,
            dotsEach: (course_cards_len > 2) ? 2: 1,
            slideBy: (course_cards_len > 2) ? 2: 1
			}
    },
    onDragged: courseInfo_removeClass
  });

  $(".tours-exp-carousel").owlCarousel({
    stagePadding: 20,
    margin: 10,
    nav: true,
    rewindNav:false,
    lazyLoad:true,
    lazyContent:true,
		responsive: {
			0: {items: 1},
			600: {items: 2},
			1000: {items: 2.5,
            loop:(tours_cards_len > 2) ? true : false,
            dotsEach: (tours_cards_len > 2) ? 2: 1,
            slideBy: (tours_cards_len > 2) ? 2: 1

			}
    },
    // onDragged: toursExp_removeClass
  });

  $(".gen-info-carousel").owlCarousel({
    stagePadding: 20,
    margin: 10,
    nav: true,
    rewindNav:false,
    lazyLoad:true,
    lazyContent:true,
		responsive: {
			0: {items: 1},
			600: {items: 2},
			1000: {items: 2.5,
            loop:(gen_info_cards_len > 2) ? true : false,
            dotsEach: (gen_info_cards_len > 2) ? 2: 1,
            slideBy: (gen_info_cards_len > 2) ? 2: 1
			}
    },
    // onDragged: genInfo_removeClass
  });


courseInfo_removeClass();
$(".course-info-carousel").on('translated.owl.carousel', function(event) {
  courseInfo_removeClass();
});
toursExp_removeClass();
$(".tours-exp-carousel").on('translated.owl.carousel', function(event) {
   toursExp_removeClass();
});
genInfo_removeClass();
$(".gen-info-carousel").on('translated.owl.carousel', function(event) {
  genInfo_removeClass();
});

function courseInfo_removeClass(){
  let total = $('.course-info-carousel .owl-item.active').length;
  console.log('courseInfo_removeClass total ',total);
  $('.course-info-carousel .owl-stage .owl-item.active').each(function(index){
      if (total == 2) {
          total = 3;
      }
      if ((index === total-1) && (total>1)) {
        console.log('Inside total ',total);
          // this is the last one
          $(this).removeClass('active');
    }
  });
}

function toursExp_removeClass(){
  let total = $('.tours-exp-carousel .owl-item.active').length;
  $('.tours-exp-carousel .owl-stage .owl-item.active').each(function(index){
      if (total == 2) {
          total = 3;
      }
      if ((index === total-1) && (total>1)) {
          // this is the last one
          $(this).removeClass('active');
    }
  });
}

function genInfo_removeClass(){
  let total = $('.gen-info-carousel .owl-item.active').length;
  $('.gen-info-carousel .owl-stage .owl-item.active').each(function(index){
      if (total == 2) {
          total = 3;
      }
      if ((index === total-1) && (total>1)) {
          // this is the last one
          $(this).removeClass('active');
    }
  });
}

} // end owl bind

export default bind_owl;