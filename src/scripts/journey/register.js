// var iAmA_val = '';

var reg_form_validation = (function() {
$('#Iama').on('change', function () {
    var iAmA_val = $('#Iama option:selected').val();
    if (iAmA_val === 'School Leaver') {
        $('.study-level').hide();
        $('.iYL').show();
    } else if ((iAmA_val === 'TAFE Student') || (iAmA_val === 'University Student') || (iAmA_val === 'Employed')) {
        $('.iYL').hide();
        $('.study-level').show();
    }
    else {
        $('.iYL,.study-level').hide();
    }
});

$("#register-form").validate({
    rules: {
        fname: "required",
        "sign-up-email": {
            required: true,
            email: true
        },
        pass: {
            required: true,
            minlength: 6
        },
        // mobile: "required",
        mobile: {
            required: true,
            number: true,
            minlength: 10,
            maxlength: 10
        },
        inputYearLevel: {
            required: "#inputIama option[value='School Leaver']:selected"
        },
        Iama: "required",
        inputStudyLevel: {
            required: function(element) {
                var inputIama_val = $('#inputIama option:selected').val();
                return ((inputIama_val === "TAFE Student") || (inputIama_val === "University Student") || (inputIama_val === "Employed"));
            }
        },
        campus: "required"
    },
    messages: {
        fname: "(Please enter your name)",
        "sign-up-email": {
            required: "(Please enter your email)",
            email: "(Please enter a valid email)"
        },
        pass: {
            required: "(Please choose a password)",
            minlength: "(Password should be atleast 6 chars long)"
        },
        mobile: {
            required: "(Please enter your phone number)",
            number: "(Please enter numbers only)",
            minlength: "(Phone number should be 10 digit long)",
            maxlength: "(Phone number should not be more than 10 digits)"
        },
        Iama: "(Please select your status)",
        inputYearLevel: "(Please select an year level)",
        inputStudyLevel: "(Please select your study level)",
        campus: "(Please select a campus)"
    },
    errorPlacement: function (error, element) {
        console.log('errors - ', error);
        if (element.attr("name") == "fname")
            error.insertBefore('#fname');
        else if (element.attr("name") == "sign-up-email")
            error.insertBefore("#sign-up-email");
        else if (element.attr("name") == "pass")
            error.insertBefore('#pass');
        else if (element.attr("name") == "mobile")
            error.insertBefore('#mobile');
        else if (element.attr("name") == "inputYearLevel")
            error.insertBefore('#inputYearLevel');
        else if (element.attr("name") == "Iama")
            error.insertBefore('#Iama');
        else if (element.attr("name") == "inputStudyLevel")
            error.insertBefore('#inputStudyLevel');
        else if (element.attr("name") == "campus")
            error.insertBefore('#campus');
        else
            error.insertAfter(element);
    }
});
//   Validation end 

$("#register-form").submit(function (e) {
    e.preventDefault();
    $(".f1-success,.f1-fail").hide();
    if ($('#register-form').valid()) {
        $("#SignupModal .loader").show();
        var fname = $.trim($("input[name=fname]").val());
        var useremail = $.trim($("input[name='sign-up-email']").val().toLowerCase());
        var pass = $("input[name=pass]").val();
        var mobile = '+61' + $("input[name=mobile]").val();
        var mobile_mkt = $("input[name=mobile]").val();
        var year = $("select[name=inputYearLevel]").val();
        var studentType = $("select[name=Iama]").val();
        var studyLevel = $('input[name=inputStudyLevel]:checked').val();
        var campusLocation = $("select[name=campus]").val();
        var emailOptIn = $('#gridCheck1').is(':checked');
        // var poolData = {
        //     UserPoolId: 'ap-southeast-2_nfIUz4PsR',
        //     ClientId: '4kq1m7got8acckio18j8si40jg'
        // };
        
        // var poolData = {
        // UserPoolId: 'ap-southeast-2_lM6HirBLN',
        // ClientId: 'tki5ievcdl3bd0scajhhv05s6'
        //  };
        // var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        // var attributeList = [];
        // var dataEmail = {
        //     Name: 'email',
        //     Value: useremail
        // };
        // var dataGivenName = {
        //     Name: 'given_name',
        //     Value: fname
        // };
        // var dataPhoneNumber = {
        //     Name: 'phone_number',
        //     Value: mobile
        // };
        // var dataYearLevel = {
        //     Name: 'custom:YearLevel',
        //     Value: year
        // };
        // var dataStudentType = {
        //     Name: 'custom:StudentType',
        //     Value: studentType
        // };
        // var dataCampusLocation = {
        //     Name: 'custom:CampusLocation',
        //     Value: campusLocation
        // };
        // var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        // var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
        // var attributeGivenName = new AmazonCognitoIdentity.CognitoUserAttribute(dataGivenName);
        // var attributeYearLevel = new AmazonCognitoIdentity.CognitoUserAttribute(dataYearLevel);
        // var attributeStudentType = new AmazonCognitoIdentity.CognitoUserAttribute(dataStudentType);
        // var attributeCampusLocation = new AmazonCognitoIdentity.CognitoUserAttribute(dataCampusLocation);

        // attributeList.push(attributeEmail);
        // attributeList.push(attributePhoneNumber);
        // attributeList.push(attributeGivenName);
        // attributeList.push(attributeYearLevel);
        // attributeList.push(attributeStudentType);
        // attributeList.push(attributeCampusLocation);

        // userPool.signUp(useremail, pass, attributeList, null, function (err, result) {
        //     if (err) {
        //         console.log(err.message || JSON.stringify(err));
        //         console.log(new Error().stack);
        //         $("#SignupModal .loader").fadeOut("slow");
        //         $(".f1-fail").toggle().empty();
        //         //console.log(err.message);
        //         //console.log('result-', result);
        //         var err_msg = err.message.match(/(Value[^:]+)(?!.*\1)/g);
        //         console.log(err_msg);
        //         for (var i in err_msg) {
        //             if ((err_msg[i].indexOf("username") > -1)) {
        //                 $(".f1-fail").append("<p>- Value at 'email' failed to satisfy constraint</p>");
        //             } else $(".f1-fail").append("<p>- " + err_msg[i] + "</p>");
        //         }
        //         if (!err_msg) {
        //             $(".f1-fail").append("<p>- " + err.message + "</p>");
        //         }
        //         return;
        //     }
        //     cognitoUser = result.user;
        //     $("#SignupModal .loader").fadeOut("slow");
        //     var message = "<h2>Account created</h2><p><a class='f1-success-redirect' href='#'>Click here</a> to login</p>";
        //     $("#register-form").toggle();
        //     $(".f1-success").toggle().html(message);
        //     //console.log("User name is " + cognitoUser.getUsername());
        //     var successPost = result.userConfirmed;
             var successPost = "Yes";
            marketoSubmit(successPost, fname, useremail, mobile_mkt, year, studentType, studyLevel, campusLocation, emailOptIn);
        // });
    }
});

function marketoSubmit(successPost, fname, useremail, mobile, year, studentType, studyLevel, campusLocation, emailOptIn) {
    // Marketo form submission
    if (successPost) {
        MktoForms2.loadForm("//app-sn01.marketo.com", "209-INQ-367", 2581);
        MktoForms2.whenReady(function (form) {
            //console.log('Form ID- ', form);
            form.onSuccess(function (vals, tyURL) {
                console.log('Form sucessfully submitted');
                console.log('vals-', vals);
                return false;
            });
            form.addHiddenFields({
                //These are the values which are submitted to Marketo
                "FirstName": fname,
                "Email": useremail,
                "MobilePhone": mobile,
                "Year_Level__c": year,
                "Lead_Type__c":studentType,
                "Campus__c": campusLocation,
                "Level_of_Study__c": studyLevel,
                "Email_Opt_In__c": emailOptIn
            });
            form.submit();
        }); // Market form end
    } // if statment end
}
}());

export {reg_form_validation};