import $ from "jquery";
import {owlCarousel} from "owl.carousel";


 // Make eventcards into a carousel
 function bind_owl() {
  //  console.log('content', content);
  // $(window).on('load', function(){
    $('.owl-carousel').owlCarousel('destroy'); // Kill owl first on click
    // $(".owl-carousel").data('owlCarousel').destroy();
    // $('.owl-carousel').trigger('destroy.owl.carousel');
    // $('.owl-carousel').empty();
    $(".owl-carousel").owlCarousel({
      center: true,
      margin: 10,
      loop: true,
      nav: true,
      stagePadding: 30,
      autoWidth: true,
      heightStyle: "content",
      lazyLoad:true,
      lazyContent:true,
      // responsive:false,
      responsiveClass:true,
      responsiveBaseElement:".module-with-carousel",
      
      responsive:{
        0:{
          items:1.15
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
    // $(".owl-carousel").trigger('insertContent.owl',content);
    // $('.owl-carousel').trigger('refresh.owl.carousel');
    // $(".owl-carousel").html(content);
  // });
}
export default bind_owl;