import $ from "jquery";
import { brotliDecompressSync } from "zlib";

var navbar_toggle = (function() {
  $(".Navbar__Link-toggle").on("click", function() {
    console.log("nav bar Clicked");
    const navs = document.querySelectorAll(".Navbar__Items");
    navs.forEach(nav => nav.classList.toggle("Navbar__ToggleShow"));
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

// $('.Navbar__Link a').on('click', function(e){
//   e.preventDefault();

//   let link = $(this).attr("href");
//   console.log('link = ' + link);
//   let goto = $("a[name='" + link + "']");
//   console.log(goto);

//   $("html").animate({ scrollTop: goto.offset().top }, 500);
// });

// Make site scroll again once video is closed.
// $(document).on(
//   "click", ".js-modal-video-dismiss-btn, .modal-video",
//   function() {
//     if ($("html").hasClass("modal-noscroll")) {
//       $("html").removeClass("modal-noscroll");
//     }
//   }
// );

export { navbar_toggle, accordion_click };
