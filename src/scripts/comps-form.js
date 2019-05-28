import $ from "jquery";
import {validate, valid} from "jquery-validation";

var comp_form = $(function() {
  $("#comps-button").on("click", function() {
    console.log("Clicked");
    $(".comps-form").show();
    $(".registration-form fieldset:first-child").fadeIn("slow");
    return false;
  });

  // next step
  $(".registration-form .btn-next").on("click", function() {
    
    var myform = $( "#comps-form" );
    myform.validate();

    let fs_id = $($(this).data("id"));
    console.log('valid ', myform.valid());
    if ( myform.valid() ) {
      console.log("Inside form function");
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
            var offset = fs_id.offset();
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

  // submit
  $("#comps-form").submit(function(e) {
    e.preventDefault();
    if ($("#comps-form").valid()) {
      console.log("Form is valid");
      let firstName = $.trim($("input[name='form-name']").val());
      let mobilePhone = $("input[name='form-mobile']").val();
      let Email = $.trim(
        $("input[name='form-email']")
          .val()
          .toLowerCase()
      );

      let Lead_Type__c = $("input[name='form-lead-type']:checked").val();
      let Year_Level__c = $("input[name='form-year-level']:checked").val();
      let Level_of_Study__c = $("input[name=inputStudyLevel]:checked").val();
      let Study_Area__c = $("input[name='form-ia']:checked")
        .map(function() {
          return this.value;
        })
        .get()
        .join("; ");
      let Campus__c = $("input[name='form-location']:checked")
        .map(function() {
          return this.value;
        })
        .get()
        .join("; ");
      console.log("Campus__c: ", Study_Area__c);

      marketoSubmit(
        firstName,
        Email,
        mobilePhone,
        Lead_Type__c,
        Year_Level__c,
        Level_of_Study__c,
        Study_Area__c,
        Campus__c
      );
    } else {
      console.log("An error has occured");
    }

    function marketoSubmit(
      firstName,
      Email,
      mobilePhone,
      Lead_Type__c,
      Year_Level__c,
      Level_of_Study__c,
      Study_Area__c,
      Campus__c
    ) {
      // Marketo form submission

      MktoForms2.loadForm("//app-sn01.marketo.com", "209-INQ-367", 3598);
      MktoForms2.whenReady(function(form) {
        console.log("Form ID- ", form);
        form.onSuccess(function(vals, tyURL) {
          console.log("Form sucessfully submitted");
          console.log("vals-", vals);
          return false;
        });
        form.addHiddenFields({
          // These are the values which are submitted to Marketo
          FirstName: firstName,
          Email: Email,
          MobilePhone: mobilePhone,
          Lead_Type__c: Lead_Type__c,
          Study_Area__c: Study_Area__c,
          disciplineArea: "Business",
          Year_Level__c: Year_Level__c,
          Level_of_Study__c: Level_of_Study__c,
          Campus__c: Campus__c
        });
        form.submit();
        // Show sucessful form submission acknowledgement
        $(".comps-form").fadeOut();
        $(".comps-msg").empty().append("<p class='thankyou-msg'>Thanks for registering! Don't forget to start planning your day so you don't miss a thing at your Deakin Open Day.</p>").fadeIn();


      }); // Market form end
    }
  });
}); // ready funtion end

export {comp_form};