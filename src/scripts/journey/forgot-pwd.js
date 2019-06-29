
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

var forgot_pwd = (function() {
    $("#forgot-pwd-form").submit(function (e) {
    $(".f3-success,.f3-fail").hide();
        //prevent Default functionality
        e.preventDefault();
    
        //var value = $('input_class_or_id').val();
        var useremail = $.trim($("input[name='forgot-pwd-email']").val().toLowerCase());
    
        var poolData = {
            UserPoolId: 'ap-southeast-2_hl6RSfO2N',
            ClientId: '1bshu2qp87fbt8kek00vfdc7np'
             };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
        var userData = {
            Username: useremail,
            Pool: userPool
        };
    
        // setup cognitoUser first
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
        // call forgotPassword on cognitoUser
        cognitoUser.forgotPassword({
            onSuccess: function (result) {
                $("#forgot-pwd-form").fadeOut();
                console.log('call result: ' + result);
                var custom_message ="<p>A verification code has been sent to your email address. Please check your inbox.<br><a data-showform='reset-pwd-form' class='forgot-login-toggle' href='#'>Click here</a> to change your password.</p>";
                $(".f3-success").toggle().html(custom_message);
            },
            onFailure: function (err) {
                console.log(err);
                if (err.code == 'InvalidParameterException') {
                    $(".f3-fail").toggle().html("Please enter a valid email address to proceed.");
                } else {
                    $(".f3-fail").toggle().html(err.message);
                }
                //  $(".f3-fail").toggle().html(err.message);
                 }
        });
    });
}());

export default forgot_pwd;