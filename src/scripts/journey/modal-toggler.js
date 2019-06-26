//$(document).ready(function () {

var modal_toggler = (function() {
    $("#SignupModal .login-toggle").click(function () {
        console.log("Inside Login-Toggle click function");
        let currentfrmID = $(this).closest('form').attr('id');
        let showformID = $(this).data("showform");
        console.log(currentfrmID, 'TO', showformID);
        $('form#'+currentfrmID).hide();
        $('form#'+showformID).show();
        $(".f1-success,.f1-fail,.f2-success,.f2-fail").hide();
    });

    $("#SignupModal .forgot-login-toggle").click(function () {
        let currentfrmID = $(this).closest('form').attr('id');
        let showformID = $(this).data("showform");
        $('#'+currentfrmID).toggle();
        $('#'+showformID).toggle();
        //$("#login-form,#forgot-pwd-form").toggle();
        $(".f2-success,.f2-fail").hide();
    });

  $(".f1-success").on("click", ".f1-success-redirect", function(event){
        $("#login-form").toggle();
        $(".f1-success,.f1-fail").hide();
    });

     $(".f3-success, #forgot-pwd-form").on("click", ".forgot-login", function(event){
        $("#forgot-pwd-form,#reset-pwd-form").toggle();
        $(".f3-success,.f3-fail").hide();
    });

     $(".f4-fail").on("click", ".code-request-again", function(event){
        $("#forgot-pwd-form,#reset-pwd-form").toggle();
        $(".f4-success,.f4-fail").hide();
    });

      $(".f4-success").on("click", ".login-after-success-pwd-change", function(event){
        $("#reset-pwd-form,#login-form").toggle();
        $(".f4-success,.f4-fail").hide();
    });
}());

export {modal_toggler};

    // Get Cookie
    // Consider deleting this code -- Not used anywhere
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    //getCookie('od-token');
    var cookie_val = getCookie('od-token');
    if (cookie_val) {
        console.log('Cookie is present: ', cookie_val);
    }

//}); // Top Wrapper end