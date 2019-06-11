// import $ from "jquery";
import validate from "jquery-validation";

const form_validation = (function(){
var iAmA_val = '';
$("input[name='form-lead-type']").change(function(){
    iAmA_val = $( "input[name='form-lead-type']:checked" ).val();
    if (iAmA_val === 'School Leaver') {
        iAmA_val = true;
        $('.iYL').show();
        $('.study-level').hide();
    } else if ((iAmA_val === 'TAFE Student') || (iAmA_val === 'University Student') || (iAmA_val === 'Employed')) {
        $('.iYL').hide();
        $('.study-level').show();
    }
    else {
        $('.iYL,.study-level').hide();
    }
});
// ----- Disable enter key
$('#comps-form').on("keyup keypress", function(e) {
    var code = e.keyCode || e.which; 
    if (code === 13) {               
        e.preventDefault();
        return false;
    }

});

$("#comps-form").validate({
    ignore: ":hidden",
    rules: {
        "form-name": "required",
        "form-mobile": {
            required: true,
            number: true,
            minlength: 10,
            maxlength: 10
        },
        "form-email": {
            required: true,
            email: true
        },
        "form-lead-type": "required",
        "form-year-level": {
            required: function(element) {
                let inputIama_val = $("input[name='form-lead-type']:checked").val();
                return (inputIama_val === "School Leaver");
            }
        },
        inputStudyLevel: {
            required: function(element) {
                let inputIama_val = $("input[name='form-lead-type']:checked").val();
                return ((inputIama_val === "TAFE Student") || (inputIama_val === "University Student") || (inputIama_val === "Employed"));
            }
        },
        "form-ia": { 
            required: true, 
            minlength: 1 
            },
        "form-location": { 
            required: true, 
            minlength: 1 
            }
        },
    messages: {
        "form-name": "(Please enter your name)",
        "form-mobile": {
            required: "(Please enter your phone number)",
            number: "(Please enter numbers only)",
            minlength: "(Phone number should be 10 digit long)",
            maxlength: "(Phone number should not be more than 10 digits)"
        },
        "form-email": {
            required: "(Please enter your email)",
            email: "(Please enter a valid email)"
        },
        "form-lead-type": "(Please select your status)",
        "form-year-level": "(Please select an year level)",
        "inputStudyLevel": "(Please select a study level)",
        "form-ia": "(Please select atleast one interest area)",
        "form-location": "(Please select atleast one campus)"
    },
    errorPlacement: function (error, element) {
        console.log('errors - ',error);
        if (element.attr("name") == "form-name")
            error.insertAfter("#form-name");
        else if (element.attr("name") == "form-mobile")
            error.insertAfter("#form-mobile");
        else if (element.attr("name") == "sign-up-email")
            error.insertAfter("label[for='reg_email'] + span");
        else if (element.attr("name") == "form-lead-type")
            error.insertAfter('.form-stutype h3');
        else if (element.attr("name") == "form-year-level")
            error.insertAfter('.iYL h3');
        else if (element.attr("name") == "inputStudyLevel")
            error.insertAfter('.study-level h3');
        else if (element.attr("name") == "form-ia")
            error.insertAfter('.form-title-ia h3');
        else if (element.attr("name") == "form-location")
            error.insertAfter('.form-title-location h3');
        else
            error.insertAfter(element);
    },

// submit
//   $("#comps-form").submit(function(e) {
    submitHandler: function (form) {
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
    // } else {
    //   console.log("An error has occured");
    // }

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
        $(".comps-msg").empty().append("<p class='thankyou-msg'>Great news! Now that you’ve registered, you’re in the draw to win some great prizes, including gift vouchers from ASOS, The Iconic, JB Hi-Fi and Netflix.</p>").fadeIn();
        
        // Scroll to succesful message text
        let comps_offset = $( ".row.comps" );
        $("html").animate({ scrollTop: comps_offset.offset().top }, 500);
      }); // Market form end
    }
}
});
}());
export {form_validation};