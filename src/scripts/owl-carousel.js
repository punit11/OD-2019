import $ from "jquery";
import {owlCarousel} from "owl.carousel";


 // Make eventcards into a carousel
 const bind_owl = function() {
    var owl = $(".owl-carousel");
    
    owl.owlCarousel('destroy'); // Kill owl first on click
    owl.owlCarousel({
      center: true,
      margin: 10,
      loop: true,
      nav: true,
      items : 2.5,
      responsive: true,
      responsiveRefreshRate: 200,
      responsive:{
        0:{
          items: 1.15
        },
        576: {
          items: 2
        },
        768: {
          items: 2.25
        },
        1200:{
          items: 2.5
        }
      }
    });
};
export default bind_owl;