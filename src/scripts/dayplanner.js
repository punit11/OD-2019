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

var whats_on = (function(){
    var test = $("#select2-campus-location-container").attr('title');
    console.log("=========>  Title attribute = " + test);
    if(!$(".planyrday-wrapper.not-logged")) {

    }
}());

export {show_sessioninfo};
