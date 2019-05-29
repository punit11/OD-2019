import $ from "jquery";
import {validate, valid} from "jquery-validation";

var comp_form = $(function() {
  $("#comps-button").on("click", function() {
    // console.log("Clicked");
    $(".comps-form").show();
    $("#comps-button").hide();
    $(".registration-form fieldset:first-child").fadeIn("slow");
    return false;
  });

  // next step
  $(".registration-form .btn-next").on("click", function() {
    
    var myform = $( "#comps-form" );
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
  });
}); // ready funtion end

export {comp_form};