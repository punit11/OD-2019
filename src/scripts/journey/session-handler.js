// Function to check cookie, and if the person is logged in or not and redirect him accordingly

// Read Cookie
    var check_if_user_logged_in = (function() {

    // function check_if_user_logged_in() {
    var logged_in = false;
	var cookieExists = /^(.*;)?\s*od-token\s*=\s*[^;]/.test(document.cookie);
	//console.log(cookieExists);
	if (cookieExists) {
		logged_in = true;
		console.log('Session is active: ', logged_in);
		return logged_in;
	} else {
		logged_in = false;
		console.log('Session is active: ', logged_in);
		return logged_in;
    }
}());

// readCookie end

    // var logged_in = readCookie();
    // if (logged_in) {
    //     console.log('Session is active: if condition', logged_in);
    //     // window.location.href="//localhost:8080/myplan.html"; 
    //     $("#SignupModal").modal("show");
    // } else {
    //     console.log('Session is active: else condition ', logged_in);
    // }
 

    export {check_if_user_logged_in};
