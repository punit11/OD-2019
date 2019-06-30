function show_hide_modal() {
  if ($(".modal.fade").hasClass("out")) {
    $(".modal.fade").removeClass("out").addClass("in").show();
    $("body").addClass("noscroll");
  } else {
    $(".modal.fade").removeClass("in").addClass("out").hide();
  }

  $(".od-select").each(function() {
    // console.log('Inside od - select ');
    if ($(this).hasClass("select2-hidden-accessible")) {
      console.log("Select already initilised ");
    } else {
      console.log("Select NOT already initilised ");
      $(this).select2({ minimumResultsForSearch: -1 }).fadeIn();
    }
  });

  $("#SignupModal .close").on("click", function() {
    $("body").removeClass("noscroll");
    $("#SignupModal").removeClass("in").addClass("out").hide();
  });

  modalHeight();

    $("[data-showform]").on('click', function(){
        console.log('*+*+*+*+*+*+*+*+ login toggle clicked');
        modalHeight();
    });
}

//calculate the height of the window and make sure the popup modal fits

function modalHeight() {
    console.log('*+*+*+*+*+*+*+*+ MODAL HEIGHT FUNCTION EXECUTED');
    var contentHeight = $(".modal-content form:visible").height(),
        pageHeight = $(window).outerHeight(),
        maxContentHeight = pageHeight - 100;

    if($(window).height() > contentHeight) {
        $(".modal-content").css({
            'max-height' : maxContentHeight + 'px',
            'min-height' : contentHeight + 'px'
        });
    } else {
        $(".modal-content").css({
            'max-height' : '500px',
            'min-height' : maxContentHeight + 'px'
        });
    }
}

export { show_hide_modal, modalHeight };
