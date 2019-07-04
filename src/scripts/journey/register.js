
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

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
            minlength: "(Password should be at least 6 chars long)"
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
        // console.log('fname ', fname);
        var useremail = $.trim($("input[name='sign-up-email']").val().toLowerCase());
        var pass = $("input[name=pass]").val();
        // console.log('pass ', pass);
        var mobile = '+61' + $("input[name=mobile]").val();
        // console.log('mobile ', mobile);
        var mobile_mkt = $("input[name=mobile]").val();
        var year = $("select[name=inputYearLevel]").val();
        // console.log('year ', year);
        var studentType = $("select[name=Iama]").val();
        // console.log('studentType ', studentType);
        var studyLevel = $('select[name=inputStudyLevel]').val();
        // console.log('studyLevel: ', studyLevel);
        var campusLocation = $("select[name=campus]").val();
        // console.log('campusLocation: ', campusLocation);
        var emailOptIn = $('#Email_Opt_In').is(':checked');
        
        // var poolData = {
        // UserPoolId: 'ap-southeast-2_lM6HirBLN',
        // ClientId: 'tki5ievcdl3bd0scajhhv05s6'
        //  };

        
        var poolData = {
        UserPoolId: 'ap-southeast-2_hl6RSfO2N',
        ClientId: '1bshu2qp87fbt8kek00vfdc7np'
         };

        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        var userData = {
            Username: useremail,
            Pool: userPool
        };
        var authenticationData = {
            Username: useremail,
            Password: pass,
        };
        
        var attributeList = [];
        var dataEmail = {
            Name: 'email',
            Value: useremail
        };
        var dataGivenName = {
            Name: 'given_name',
            Value: fname
        };
        var dataPhoneNumber = {
            Name: 'phone_number',
            Value: mobile
        };
        var dataYearLevel = {
            Name: 'custom:YearLevel',
            Value: year
        };
        var dataStudentType = {
            Name: 'custom:StudentType',
            Value: studentType
        };
        var dataCampusLocation = {
            Name: 'custom:CampusLocation',
            Value: campusLocation
        };
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
        var attributeGivenName = new AmazonCognitoIdentity.CognitoUserAttribute(dataGivenName);
        var attributeYearLevel = new AmazonCognitoIdentity.CognitoUserAttribute(dataYearLevel);
        var attributeStudentType = new AmazonCognitoIdentity.CognitoUserAttribute(dataStudentType);
        var attributeCampusLocation = new AmazonCognitoIdentity.CognitoUserAttribute(dataCampusLocation);

        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNumber);
        attributeList.push(attributeGivenName);
        attributeList.push(attributeYearLevel);
        attributeList.push(attributeStudentType);
        attributeList.push(attributeCampusLocation);

        console.log('useremail ', useremail);
        console.log('pass ', pass);
        console.log('attributeList ', attributeList);

        // var cognitoUser;
        userPool.signUp(useremail, pass, attributeList, null, function (err, result) {
            if (err) {
                console.log('Cognito err_msg 1', err.message || JSON.stringify(err));
                console.log(new Error().stack);
                $("#SignupModal .loader").fadeOut("slow");
                $("#register-form .aws-error").toggle().empty();
                //console.log(err.message);
                //console.log('result-', result);
                var err_msg = err.message.match(/(Value[^:]+)(?!.*\1)/g);
                console.log('Cognito err_msg 2', err_msg);
                for (var i in err_msg) {
                    if ((err_msg[i].indexOf("username") > -1)) {
                        $("#register-form .aws-error").append("<p>- Value at 'email' failed to satisfy constraint</p>");
                    } else $("#register-form .aws-error").append("<p>- " + err_msg[i] + "</p>");
                }
                if (!err_msg) {
                    $("#register-form .aws-error").append("<p>- " + err.message + "</p>");
                }
                return;
            }

             //  Immediately sign-in the user after sucessful sign-up

             var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
             
             var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
             cognitoUser.authenticateUser(authenticationDetails, {
                 onSuccess: function (result) {
                     //console.log('access token + ' + result.getAccessToken().getJwtToken());
                     //console.log('idToken + ' + result.idToken.jwtToken);
                     console.log('Sub : ' + result.idToken.payload.sub);
                     console.log('Name : ' + result.idToken.payload.given_name);
                     console.log('Email : ' + result.idToken.payload.email);
                     console.log('Campus : ' + result.idToken.payload['custom:CampusLocation']);

                     let user_selected_loc = result.idToken.payload['custom:CampusLocation'];
         
                     // Set cookie function
         
                     function setCookie(token_names) {
                         //console.log('token length',Object.keys(token_names).length);
                         for (var key in token_names) {
                             // console.log('key name ', key);
                             // console.log('key value ', token_names[key]);
                             // Create cookie for each passed key
                             var name = key;
                             var expires = "";
                             var value = token_names[key];
                             var date = new Date();
                             date.setTime(date.getTime() + (60 * 60 * 1000));
                             expires = "; expires=" + date.toUTCString();
                             document.cookie = name + "=" + (value || "") + expires + "; path=/";
                         }
                     }
         
                     var token_names = {
                         'od-token': result.idToken.jwtToken,
                         'od-sub': result.idToken.payload.sub,
                         'od-campus': result.idToken.payload['custom:CampusLocation']
                     };
         
                     setCookie(token_names);
         
                     var cognitoGetUser = userPool.getCurrentUser();
                     if (cognitoGetUser != null) {
                         cognitoGetUser.getSession(function (err, result) {
                             if (result) {
                                 console.log("User Successfuly Authenticated!");
                                 $("#register-form").toggle();
                                 $("#SignupModal .loader").fadeOut("slow");
                                 $(".f1-success").toggle().html("<h2>Account Created</h2><p>You are ready to start planning your day</p>");
                                //  $(".f1-success").toggle().html("<h2>Account Created</h2><p>You are ready to start planning your day at</p><p>" + user_selected_loc +"</p>");

                                 
                                 // set the height of the modal based on success message height
                                var successHeight = $('.f1-success').height() + 75;
                                $('.modal-content').css('min-height', successHeight);
                             }
                         });
                     }

                 },
         
                 onFailure: function (err) {
                     $("#SignupModal .loader").fadeOut("slow");
                     // console.log(err.message);
                     if (err.code == 'UserNotConfirmedException') {
                         $(".f2-fail").toggle().html("Your email address is not yet verified. Please check your inbox to verify your email address.");
                     } else if (err.code == 'PasswordResetRequiredException') {
                         $(".f2-fail").toggle().html("You need to reset your password.");
                     } else if (err.code == 'NotAuthorizedException') {
                         $(".f2-fail").toggle().html("Your username or login is incorrect. Please try again or reset your password.");
                     } else if (err.code == 'ResourceNotFoundException') {
                         $(".f2-fail").toggle().html("There are some technical problems with the server. Please try again later.");
                     } else {
                         $(".f2-fail").toggle().html(err.message);
                     }
                 },
                 mfaRequired: function (codeDeliveryDetails) {
                     var verificationCode = prompt('Please input verification code', '');
                     cognitoUser.sendMFACode(verificationCode, this);
                 }
             });

            //  Immediate sign-in end

            // cognitoUser = result.user;
            // $("#SignupModal .loader").fadeOut("slow");
            // var message = "<h2>Account created</h2><p><a class='f1-success-redirect' href='#'>Click here</a> to login</p>";
            // $("#register-form").toggle();
            // $(".f1-success").toggle().html(message);
            // console.log("User name is " + cognitoUser.getUsername());
            var successPost = result.userConfirmed;
            //  var successPost = "Yes";
            marketoSubmit(successPost, fname, useremail, mobile_mkt, year, studentType, studyLevel, campusLocation, emailOptIn);
        });
    }
});

function marketoSubmit(successPost, fname, useremail, mobile, year, studentType, studyLevel, campusLocation, emailOptIn) {
    // Marketo form submission
    if (successPost) {
        MktoForms2.loadForm("//app-sn01.marketo.com", "209-INQ-367", 3610);
        MktoForms2.whenReady(function (form) {
            //console.log('Form ID- ', form);
            form.onSuccess(function (vals, tyURL) {
                console.log('Form sucessfully submitted');
                console.log('vals-', vals);
                return false;
            });
            let myForm = MktoForms2.getForm(3610);
            myForm.addHiddenFields({
                //These are the values which are submitted to Marketo
                "FirstName": fname,
                "Email": useremail,
                "MobilePhone": mobile,
                "Year_Level__c": year,
                "Lead_Type__c": studentType,
                "Campus__c": campusLocation,
                "Level_of_Study__c": studyLevel,
                "Email_Opt_In__c": emailOptIn
            });
            myForm.submit();
        }); // Market form end
    } // if statment end
}
}());

export {reg_form_validation};