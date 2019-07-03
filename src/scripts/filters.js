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
    }
    });

    // IA filters
    
$("#course-area").on('change', function () {
    $("#popular-courses").parents( ".option-container" ).removeClass("filter-highlight");
    $(this).parents( ".option-container" ).addClass("filter-highlight");
    let x = $('#popular-courses').val();
    if(x){
    $('#popular-courses').val('').trigger('change.select2');
    }
    $('.owl-carousel').empty(); // Clear old carousel data
    console.log("IA clicked");
    selected_dd_value = $('#course-area').val();
    console.log('selected_dd_value ', selected_dd_value);
	populate_cards(session_clicked, selected_dd_value, 'int_areas');
});

// Pre-selected course event filters

$("#popular-courses").on('change', function () {
    $("#course-area").parents( ".option-container" ).removeClass("filter-highlight");
    $(this).parents( ".option-container" ).addClass("filter-highlight");
    // $("#course-area").val('-1').trigger('change'); 
    let x = $('#course-area').val();
    if(x) {
    $('#course-area').val('').trigger('change.select2');
    }
    $('.owl-carousel').empty(); // Clear old carousel data
    console.log("Pre-selected course clicked");
    selected_dd_value = $('#popular-courses').val();
    console.log('selected_dd_value ', selected_dd_value);
	populate_cards(session_clicked, selected_dd_value, 'courses');
});

    // Session time filters
    $(".js-reset-filters").click(function(e) {
        e.preventDefault();
        $('.filter-all').parent().addClass('selected').siblings().removeClass('selected');
        $('#popular-courses, #course-area').val('').trigger('change.select2');
        $('#popular-courses, #course-area').parents( ".option-container" ).removeClass("filter-highlight");;
        populate_cards();
    });

}());

export default filters;