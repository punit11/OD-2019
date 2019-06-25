// import {check_if_user_logged_in} from "./session-handler";
import {getCookieValue} from "./get-cookies";
import {show_hide_modal} from "./show-hide-modal";

 var add_to_planner = (function(){
    var clickedEventID = '';

    //  $('.owl-carousel .selected').each(function() {
    //       course_arr.push($(this).data("eventid"));
    //     }); 
    //     console.log('Initial course_arr',course_arr);

      $(".owl-carousel").on("click", "span.add", function() {
      let logged_in = getCookieValue('od-token');
      if (logged_in) {
 // Get all the selected courses
      // var course_arr = [];
      //   $('.owl-carousel .selected').each(function() {
      //     course_arr.push($(this).data("eventid"));
      //   }); 
      //   console.log('Initial course_arr',course_arr);

      let course_count = parseInt($(".js-sessions-added").text());
      console.log('course_count ', course_count);  
      // console.log("event added");
      $(this).toggleClass("selected");
      if ($(this).hasClass("selected")) {
      course_count += 1;
      clickedEventID = $(this).data("eventid");

      // Push the item to localStorage saved events
      let storedData = localStorage.getItem("od_saved_events");
      if (storedData) {
        let od_saved_events = JSON.parse(storedData);
        od_saved_events.push(clickedEventID);
      // course_arr.push(clickedEventID);
      // console.log('Arr ', course_arr);
      localStorage.setItem('od_saved_events', JSON.stringify(od_saved_events));
      }
    }
      else {
        course_count -= 1;
        clickedEventID = $(this).data("eventid");
        // Remove event from local storage
        let storedData = localStorage.getItem("od_saved_events");
        if (storedData) {
          let od_saved_events = JSON.parse(storedData);

          od_saved_events = od_saved_events.filter(item => item !== clickedEventID); // Remove unclicked event from arr 
          console.log('Inside else', od_saved_events);
          localStorage.setItem('od_saved_events', JSON.stringify(od_saved_events));
      }
    }
      $('.js-sessions-added').text(course_count);
    }
    else  show_hide_modal();
  });

    // ---------------------
    // Add events to planner
    // ---------------------

    $('.add-to-planner').on('click', function () {
     
    let logged_in = getCookieValue('od-token');
    // console.log("logged_in", logged_in);
    // console.log("original_events_arr ", original_events_arr);
    if (logged_in) {
    // Get the values of all 3 cookies
      let cookie_value = getCookieValue('od-token');
      let sub_value = getCookieValue('od-sub');
      let campus_value = getCookieValue('od-campus');

      // Get all the selected courses
      // var course_arr = [];
      // $('.owl-carousel .selected').each(function() {
      //   course_arr.push($(this).data("eventid"));
      // }); 
      // console.log('Altered array ', course_arr);

      let storedData = localStorage.getItem("od_saved_events");
      if (storedData) {
        var od_saved_events = JSON.parse(storedData);
      }

      // Calculate difference between arrays
      // var arr_diff = original_events_arr.filter(function(obj) { return course_arr.indexOf(obj) == -1; });
      // console.log('arr_diff ', arr_diff);

      var dataset = {
        sub: sub_value,
        EventID: od_saved_events
    };
    //var JSONObject= {"uname":uname, "password":password };
    var jsonData = JSON.stringify(dataset);
    
    $.ajax({
        // url: 'https://9zhax5mcy1.execute-api.ap-southeast-2.amazonaws.com/Production/od-2018',
        url: 'https://33i3l7ehy8.execute-api.ap-southeast-2.amazonaws.com/production/od-2019',
        type: 'PUT',
        data: jsonData,
        headers: {
        'cog-token': cookie_value
        },
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log("success");
            $(".planner-add-success").text("Events were sucessfully added to your planner.").delay(3000).fadeOut('slow');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
    }
    else show_hide_modal();
}); // Add to planner end

}());

export {add_to_planner};