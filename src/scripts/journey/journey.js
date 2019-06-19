var journey = (function() {
    $('.js-journey').on('click', function(){
        console.log("Working");
        if($('.modal.fade').hasClass('out')) {
            $('.modal.fade').removeClass('out').addClass('in').show();
        } else {
            $('.modal.fade').removeClass('in').addClass('out').hide();
        }
    });

    $('#SignupModal .close').on('click', function(){
        $('#SignupModal').removeClass('in').addClass('out').hide();
    });

    $('.login-toggle').on('click', function(){
        var nextform = ($(this).data('showform'));
        console.log(nextform);

        $('form').hide();
        $('form#' + nextform).show();
    });
}());

export {journey};