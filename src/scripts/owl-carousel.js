import $ from "jquery";
import {owlCarousel} from "owl.carousel";

 
 // Make eventcards into a carousel
 const bind_owl = function() {
  // $(window).on('load', function(){
    $('.owl-carousel').owlCarousel('destroy'); // Kill owl first on click
    $(".owl-carousel").owlCarousel({
      center: true,
      loop:true,
      margin:10,
      nav: true,
      stagePadding: 0,
      heightStyle: "content",
      // responsive:false,
      responsiveClass:true,
      // responsiveBaseElement:".module-with-carousel",
      
      // responsive:{
      //   0:{
      //     items:1.15
      //   },
      //   576: {
      //     items: 2
      //   },
      //   768: {
      //     items: 2.25
      //   },
      //   1200:{
      //     items:2.5
      //   }
      // }
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    });
    // $('.owl-carousel').trigger('refresh.owl.carousel');
    // $(".owl-carousel").html(content);
  // });
};
export default bind_owl;