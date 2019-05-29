import $ from "jquery";

var show_sessioninfo = (function() {
    if ($(window).width() > 768) {
        $('.sessions-container button.accordion').addClass('active');
    } else {
        $('.sessions-container button.accordion').removeClass('active');
    }
}());

$(window).on('resize', function(){
    var win = $(this);
    if(win.width() > 768) {
        $('.sessions-container button.accordion').addClass('active');
    }  else {
        $('.sessions-container button.accordion').removeClass('active');
    }
});


export {show_sessioninfo};
