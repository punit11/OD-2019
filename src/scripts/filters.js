import {populate_cards} from "./populate-cards";
// import bind_owl from "./owl-carousel";

var filters = (function() {

    var session_clicked ='';
    var selected_dd_value = '';

    // Session time filters
$(".refine ul li a").click(function(e) {
    e.preventDefault();
    

    $(this).parent().addClass('selected').siblings().removeClass('selected');
    console.log($(this).text());
    $('.owl-carousel').empty(); // Clear old carousel data
    session_clicked = $(this).text();
    if (session_clicked === "Morning"){
        populate_cards(session_clicked,selected_dd_value);
    }
    else if (session_clicked === "Afternoon") {
        populate_cards(session_clicked,selected_dd_value);
    }
    else if (session_clicked === "All day") {
        populate_cards(session_clicked,selected_dd_value);
    }
    else {
        session_clicked = '';
        populate_cards(session_clicked,selected_dd_value);
    };
    });

    // IA filters
    
$("#course-area").on('change', function () {
    $('.owl-carousel').empty(); // Clear old carousel data
     // selected_dd_value = $('#course-area').val();
    console.log("IA clicked");
    // let selected_dd_value = $('#course-area').find(':selected');
    selected_dd_value = $('#course-area').val();
    console.log('selected_dd_value ', selected_dd_value);
	populate_cards(session_clicked, selected_dd_value);
});
}());

export default filters;