
import {show_hide_modal} from "./show-hide-modal";

var journey = $(function() {
    $('.js-journey').on('click', function(){
        show_hide_modal();

        var contentHeight = $(".modal-content").height(),
            pageHeight = $(window).outerHeight(),
            maxContentHeight = pageHeight - 100;

        $(".modal-content").css('max-height', maxContentHeight + 'px');
    });

    
}());

export {journey};