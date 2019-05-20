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
    }
});