
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

var reset_pwd = (function() {
$("#reset-pwd-form").submit(function (e) {
    e.preventDefault();
    $(".f4-success,.f4-fail").hide();
    //prevent Default functionality
    console.log("Forgot pwd function");

    //var value = $('input_class_or_id').val();
    var useremail = $.trim($("input[name='reset-pwd-email']").val().toLowerCase());
    var pass = $("input[name='reset-pass']").val();
    var confirmationCode = $("input[name='reset-verify-code']").val();

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
    cognitoUser.confirmPassword(confirmationCode, pass, {
        onFailure(err) {
            console.log(err);
            if (err.code == 'ExpiredCodeException') {
                custom_message="Invalid code provided, please <a class='code-request-again' href='#'>request a code again</a>.";
                $(".f4-fail").toggle().html(custom_message);
            } else {
                $(".f4-fail").toggle().html(err.message);
            }
        },
        onSuccess() {
            console.log("Success");
            $(".f4-success").toggle().html("<p>Your password has been changed sucessfully. <br><a class='login-after-success-pwd-change' href='#'>Click here</a> to login.</p>");

            // set the height of the modal based on success message height
            var successHeight = $('.f4-success').height() + 75;
            $('.modal-content').css('min-height', successHeight);
        },
    });

});
}());
export default reset_pwd;