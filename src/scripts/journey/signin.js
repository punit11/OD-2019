import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import render_ticks from "./render-ticks";
import getOdEvents from "./get-events-for-planner";
import login_check from "../planner/planner";

var signin = (function(callback_func1,callback_func2) {

    // callback_func3 = callback_func3 || ''; //set default to all
    // console.log('callback_func3',callback_func3);
     $("#login-form").submit(function (e) {
    //console.log('e', e);
    $(".f2-success,.f2-fail").hide();
    //prevent Default functionality
    e.preventDefault();
    $("#SignupModal .loader").show();
    //var value = $('input_class_or_id').val();
    var useremail = $.trim($("input[name='sign-in-email']").val().toLowerCase());
    var pass = $("input[name=sign-in-pass]").val();

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
        Username: useremail, // your username here
        Password: pass, // your password here
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var userData;
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return cognitoUser.authenticateUser(authenticationDetails, {
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
                        $("#SignupModal .loader").fadeOut("slow");
                        $("#login-form").toggle();
                        $(".f2-success").toggle().html("<h2>You have successfully signed in!</h2><p>You are ready to start planning your day</p>");
                        // $(".f2-success").toggle().html("<h2>You have successfully signed in!</h2><p>You are ready to start planning your day at</p><p>" + user_selected_loc + "</p>");
                        
                        // set the height of the modal based on success message height
                        var successHeight = $('.f2-success').height() + 40;
                        $('.modal-content').css('min-height', successHeight);
                        
                    }
                });
            }
            callback_func1();
            callback_func2();
            // if (callback_func3) {
            //     console.log("callback_func3 executed");
            // callback_func3();
            // }
        },

        onFailure: function (err) {
            $("#SignupModal .loader").fadeOut("slow");
            // console.log(err.message);
            if (err.code == 'UserNotConfirmedException') {
                $(".f2-fail").toggle().html("Your email address is not yet verified. Please check your inbox to verify your email address.");
            } else if (err.code == 'PasswordResetRequiredException') {
                $(".f2-fail").toggle().html("You need to reset your password.");
            } else if (err.code == 'NotAuthorizedException') {
                $(".f2-fail").toggle().html("Your username or password is incorrect. Please try again or reset your password.");
            } else if (err.code == 'ResourceNotFoundException') {
                $(".f2-fail").toggle().html("There are some technical problems with the server. Please try again later.");
            } else if (err.code == 'InvalidParameterException') {
                $(".f2-fail").toggle().html("Please enter your email address");
            } else if (err.code == 'UserNotFoundException') {
                $(".f2-fail").toggle().html("Sorry, We couldn't find an account with that email address in our system.");
            } 
            else {
                $(".f2-fail").toggle().html(err.message);
            }
        },
        mfaRequired: function (codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code', '');
            cognitoUser.sendMFACode(verificationCode, this);
        }
        
    });     
    
});
}(getOdEvents,render_ticks));
export {signin};