// import $ from "jquery";
// import { brotliDecompressSync } from "zlib";

// var navbar_toggle = (function() {
//   $(".Navbar__Link-toggle").on("click", function() {
//     console.log("nav bar Clicked");
//     const navs = document.querySelectorAll(".Navbar__Items");
//     navs.forEach(nav => nav.classList.toggle("Navbar__ToggleShow"));
//   });
// }());


var navbar_toggle = (function() { // Begin jQuery
 
    // If a link has a dropdown, add sub menu toggle.
    $('nav ul li a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      // Close one dropdown when selecting another
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $('html').click(function() {
      $('.nav-dropdown').hide();
    });
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });
    // Hamburger to X toggle
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
 }());

var accordion_click = (function() {
  $(document).on("click", "button.accordion", function() {
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      $(this).find(".button-text").text("Hide");
      // $(this).find("span").text("Show less");
    } else {
      $(this).find(".button-text").text("Show");
      // $(this).find("span").text("Show more");
    }
  });
}());

var navbar_click = (function() {
  $("a.rsvp, a.faqs").on("click", function(e) {
    e.preventDefault();
    let clicked_class = $(this).attr("class");
    if (clicked_class === 'rsvp') {
      custom_scroll('rsvp', 500);
    }
    else custom_scroll('faqs', 1000);

    function custom_scroll(ele, ani_time) {
    // let ele_offset = $('a.'+ele);
    // let comps_offset = $( ".comps-form" );
    // console.log('comps_offset ',comps_offset);
    // let ele_offset = document.querySelector('[name='+el]');
 console.log('ele  ',ele);
 
    let ele_offset = $('[name='+ele+']');
    console.log('scrollTop = ' + ele_offset.offset().top);
    console.log('ele_offset ',ele_offset);
    $("html, body").animate({ scrollTop: ele_offset.offset().top }, ani_time);
    }
  });
}());

var what_os = (function() {
  var whatOS = navigator.platform;
  var userAgent = window.navigator.userAgent;
  $('body').addClass(whatOS);
  if (/Android/.test(userAgent)) {
    $('body').addClass('android');  
  }
}());

export { navbar_toggle, accordion_click, what_os };
