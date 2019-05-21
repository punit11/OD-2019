import $ from "jquery";
import {owlCarousel} from "owl.carousel";

 
 // Make eventcards into a carousel
 const owl = $(function() {
     $(".owl-carousel").owlCarousel({
    center: true,
    loop:true,
    margin:10,
    nav: true,
    stagePadding: 0,
    heightStyle: "content",
    responsiveClass:true,
    responsive:{
      0: {
        items: 3
      },
      576: {
        items: 2
      },
      768: {
        items: 2.25
      },
      1200:{
          items:2.5
      }
    }
  });
});
export {owl};