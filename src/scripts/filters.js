import {populate_cards} from "./populate-cards";
// import bind_owl from "./owl-carousel";

var filters = (function() {
var session_time_flag = '';

$(".refine ul li a").click(function() {
    $(this).parent().addClass('selected').siblings().removeClass('selected');
    console.log($(this).text());
    });

// Filter od-morning-sessions
$('.filter-morning').on('click', function (e) {
    e.preventDefault();
    // var c_id = this.id;
    // console.log("morning clicked");
    session_time_flag = 'Morning';
    $('.owl-carousel').hide();
    $('.owl-carousel').empty();
    populate_cards(session_time_flag);
    setTimeout(function(){
        $('.owl-carousel').fadeIn(300);
    }, 300);
    
});

$('.filter-noon').on('click', function (e) {
    e.preventDefault();
    // var c_id = this.id;
    // console.log("afternoon clicked");
    session_time_flag = 'Afternoon';

    $('.owl-carousel').empty();
    populate_cards(session_time_flag);
});
}());

export default filters;