import $ from "jquery";

var show_sessioninfo = (function() {
    if ($(window).width() > 768) {
        $('button.accordion').addClass('active');
    } else {
        $('button.accordion').removeClass('active');
    }
}());



export {show_sessioninfo};
