
import {show_hide_modal} from "./show-hide-modal";

var journey = $(function() {
    $('.js-journey').on('click', function(){
        show_hide_modal();
    });

    
}());

export {journey};