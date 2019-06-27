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

  //calculate the height of the window and make sure the popup modal fits
  var contentHeight = $(".modal-content").height(),
    pageHeight = $(window).outerHeight(),
    maxContentHeight = pageHeight - 100;

    if($(window).height() > 550) {
        $(".modal-content").css('max-height', maxContentHeight + 'px');
    } else {
        $(".modal-content").css('max-height', '500px');
    }
}

export { show_hide_modal };
