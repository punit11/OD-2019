// import $ from "jquery";
import {validate, valid} from "jquery-validation";

var baf_form = $(function() {
  $("#baf-form-button").on("click", function() {
    // console.log("Clicked");
    $(".baf-form").show();
    $("#baf-button").hide();
    $(".registration-form fieldset:first-child").fadeIn("slow");
    let comps_offset = $( ".baf-form" );
    $("html, body").animate({ scrollTop: comps_offset.offset().top }, 500);
    return false;
  });

  // next step
  $(".registration-form .btn-next").on("click", function() {
    var myform = $( "#baf-form" );
    myform.validate();
    let fs_id = $($(this).data("id"));
    // console.log('valid ', myform.valid());
    if ( myform.valid() ) {
      // console.log("Inside form function");
      var parent_fieldset = $(this).parents("fieldset");
      var next_step = true;
      if (next_step) {
        $.when(
          parent_fieldset.fadeOut(400, function() {
            $(this)
              .next()
              .fadeIn();
          })
        ) // when end
          .done(function() {
            $("html").animate({ scrollTop: fs_id.offset().top }, 500);
            // var offset = fs_id.offset();
          });
      }
    }
  });

  // previous step
  $(".registration-form .btn-previous").on("click", function() {
    $(this)
      .parents("fieldset")
      .fadeOut(400, function() {
        $(this)
          .prev()
          .fadeIn();
      });
      console.log("Offset applied");
      let comps_offset = $( "#baf-form" );
      console.log("comps_offset --- ", comps_offset);
         if (navigator.userAgent.toLowerCase().match(/(ipad|iphone)/)) {
           $("body").animate({ scrollTop: comps_offset.offset().top }, 500).delay(400);
            }
           else $("html,body").animate({ scrollTop: comps_offset.offset().top }, 500).delay(400);
  });
}); // ready funtion end

export {baf_form};