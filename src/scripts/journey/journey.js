import {select2} from "select2";

var journey = $(function() {
    $('.js-journey').on('click', function(){
        
        $("body").addClass('noscroll');

        console.log("Working");
        if($('.modal.fade').hasClass('out')) {
            $('.modal.fade').removeClass('out').addClass('in').show();
        } else {
            $('.modal.fade').removeClass('in').addClass('out').hide();
        }

        $('.od-select').each(function(){
            // console.log('Inside od - select ');
            if ($(this).hasClass("select2-hidden-accessible")) {
                console.log('Select already initilised ');
            } else {
                console.log('Select NOT already initilised ');
            $(this).select2({minimumResultsForSearch: -1}).fadeIn();
            }
          });

    });

    $('#SignupModal .close').on('click', function(){
        $('#SignupModal').removeClass('in').addClass('out').hide();
        $("body").removeClass('noscroll');
    });

    $('.login-toggle').on('click', function(){
        var nextform = ($(this).data('showform'));
        console.log(nextform);
        $('form').hide();
        $('form#' + nextform).show();
    });

    $(document).ready(function(){
        setTimeout(function(){
            $("head style").remove();
        }, 1000);
        
    });
    
}());

export {journey};