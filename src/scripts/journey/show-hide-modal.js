        
        function show_hide_modal() {
        // console.log("Working");
        // callback = callback || ''; //set default to all
        // console.log('callback',callback);

        if($('.modal.fade').hasClass('out')) {
            $('.modal.fade').removeClass('out').addClass('in').show();
            $("body").addClass('noscroll');
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
          $('#SignupModal .close').on('click', function(){
            $("body").removeClass('noscroll');
        $('#SignupModal').removeClass('in').addClass('out').hide();
    });
   
       }

        export {show_hide_modal};