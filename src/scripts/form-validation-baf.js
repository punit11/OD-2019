// import $ from "jquery";
import validate from "jquery-validation";
const baf_form_validation = (function(){

// ----- Disable enter key
$('#baf-form').on("keyup keypress", function(e) {
    var code = e.keyCode || e.which; 
    if (code === 13) {               
        e.preventDefault();
        return false;
    }
});

$("#baf-form").validate({
    ignore: ":hidden",
    rules: {
        "firstName": "required",
        "lastName": "required",
        "mobilePhone": {
            required: true,
            number: true,
            minlength: 10,
            maxlength: 10
        },
        "email": {
            required: true,
            email: true
        },
        "Campus__c": { 
            required: true,
            minlength: 1
            },
        "Email_Opt_In__c": {
              required: true
          },
        "openDayChoice": {
            required: true
        },
        },
    messages: {
        "firstName": "(Please enter your first name)",
        "lastName": "(Please enter your last name)",
        "mobilePhone": {
            required: "(Please enter your phone number)",
            number: "(Please enter numbers only)",
            minlength: "(Phone number should be 10 digit long)",
            maxlength: "(Phone number should not be more than 10 digits)"
        },
        "email": {
            required: "(Please enter your email)",
            email: "(Please enter a valid email)"
        },
        "Campus__c": "(Please select atleast one campus)",
        "Email_Opt_In__c": "(Please check this checkbox)",
        "openDayChoice": "(Please check this checkbox)"
    },
    errorPlacement: function (error, element) {
        console.log('errors - ',error);
        if (element.attr("name") == "firstName")
            error.insertAfter("#firstName");
        else if (element.attr("name") == "mobilePhone")
            error.insertAfter("#mobilePhone");
        else if (element.attr("name") == "Campus__c")
            error.insertAfter('.form-title-location h3');
        else if (element.attr("name") == "Email_Opt_In__c")
            error.insertAfter('.optin-checkbox label');
        else if (element.attr("name") == "openDayChoice")
            error.insertAfter('.tnc-checkbox label');
        else
            error.insertAfter(element);
    },

// submit
//   $("#comps-form").submit(function(e) {
    submitHandler: function (form) {
      console.log("Form is valid");
      let firstName = $.trim($("input[name='firstName']").val());
      let lastName = $.trim($("input[name='lastName']").val());
      
      let mobilePhone = $("input[name='mobilePhone']").val();
      let Email = $.trim(
        $("input[name='email']")
          .val()
          .toLowerCase()
      );
      let Campus__c = $("input[name='Campus__c']:checked")
        .map(function() {
          return this.value;
        })
        .get()
        .join("; ");
      console.log("Campus__c: ", Campus__c);
      let OptInc = $.trim($("input[name='Email_Opt_In__c']").val());
      let odChoice = $("input[name='openDayChoice']").val();

      console.log("OptInc: ", OptInc);
      console.log("odChoice: ", odChoice);


      marketoSubmit(
        firstName,
        lastName,
        Email,
        mobilePhone,
        Campus__c,
        OptInc,
        odChoice
      );
    // } else {
    //   console.log("An error has occured");
    // }

    function marketoSubmit(
      firstName,
      lastName,
      Email,
      mobilePhone,
      Campus__c,
      OptInc,
      odChoice
    ) {
      // Marketo form submission

      MktoForms2.loadForm("//app-sn01.marketo.com", "209-INQ-367", 3590);
      MktoForms2.whenReady(function(form) {
        console.log("Form ID- ", form);
        console.log('lastName ',lastName);
        form.onSuccess(function(vals, tyURL) {
          console.log("Form sucessfully submitted");
          console.log("vals-", vals);
          return false;
        });
        form.addHiddenFields({
          // These are the values which are submitted to Marketo
          FirstName: firstName,
          LastName: lastName,
          Email: Email,
          MobilePhone: mobilePhone,
          Campus__c: Campus__c,
          Email_Opt_In__c: OptInc,
          openDayChoice4: odChoice
        });
        form.submit();

        // Show sucessful form submission acknowledgement
        $(".baf-form, #baf-form-button").fadeOut();
        $(".baf-msg").empty().append("<p class='thankyou-msg'>Great, you are now registered for the competition.</p>").fadeIn();
        
         // Scroll to succesful message text
          // $("html,body").animate({ scrollTop: comps_offset.offset().top }, 500);
         let comps_offset = $( ".comp-info" );
         if (navigator.userAgent.toLowerCase().match(/(ipad|iphone)/)) {
           $("body").animate({ scrollTop: comps_offset.offset().top }, 500);
            }
           else $("html,body").animate({ scrollTop: comps_offset.offset().top }, 500);
       }); // Market form end
    }
}
});
}());
export {baf_form_validation};