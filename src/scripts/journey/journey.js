
import {show_hide_modal} from "./show-hide-modal";

var journey = $(function() {
    $('.js-journey').on('click', function(){
        show_hide_modal();

        var contentHeight = $(".modal-content").height(),
        pageHeight = $(window).outerHeight(),
        maxContentHeight = pageHeight - 100;

        console.log("pageheight = " + pageHeight);
        if($(window).height() > 550) {
            console.log("window height > 500");
            $(".modal-content").css('max-height', maxContentHeight + 'px');
        } else {
            console.log("window height < 500");
            $(".modal-content").css('max-height', '500px');
        }
    });    
}());

export {journey};