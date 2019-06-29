// import {check_if_user_logged_in} from "./session-handler";
import {getCookieValue} from "./get-cookies";
import {show_hide_modal} from "./show-hide-modal";

 var add_to_planner = (function(){
    var clickedEventID = '';
    var od_saved_events = [];

      $(".owl-carousel").on("click", "span.add", function() {

      if (!logged_in) {
      var logged_in = getCookieValue('od-token');
        }
      if (logged_in) {
      // Get all the selected courses

      let course_count = parseInt($(".js-sessions-added").text());
      console.log('course_count ', course_count);  
      // console.log("event added");
      // let clicked_evt = this; // for clone
      // clickedEventID = $(this).data("eventid");  // for clone

      $(this).toggleClass("selected");

      // let clicked_parent = $(this).parent();
      // if ($(clicked_parent.hasClass('.cloned'))) {
      // $('.cloned span[data-eventid =' + clickedEventID + ']').toggleClass("selected"); // for clone
      // }

      if ($(this).hasClass("selected")) {
      course_count += 1;
      clickedEventID = $(this).data("eventid");

      // Push the item to localStorage saved events
      let storedData = localStorage.getItem("od_saved_events");

      if ((storedData !== "undefined") && (storedData !== null)) { // Append to existing arr if there are events present already
            let od_saved_events = JSON.parse(storedData);
            od_saved_events.push(clickedEventID);
            localStorage.setItem('od_saved_events', JSON.stringify(od_saved_events));
          }
          else { // Populate a new arr if no events selected already
            od_saved_events.push(clickedEventID);
            localStorage.setItem('od_saved_events', JSON.stringify(od_saved_events));
          }
        }
      else {
        course_count -= 1;
        clickedEventID = $(this).data("eventid");
        // Remove event from local storage
        let storedData = localStorage.getItem("od_saved_events");

        if ((storedData !== "undefined") && (storedData !== null)) { // Remove events from existing arr if there are events present already
          let od_saved_events = JSON.parse(storedData);
          od_saved_events = od_saved_events.filter(item => item !== clickedEventID); // Remove unclicked event from arr 
          localStorage.setItem('od_saved_events', JSON.stringify(od_saved_events));
      }
         else ; // Do nothing
    }
    
      $('.js-sessions-added, .num--pink--circle').text(course_count);
      // $('.num--pink--circle').text(course_count);
    }
    else  show_hide_modal();
  });

    // ---------------------
    // Add events to planner
    // ---------------------

    $('.add-to-planner').on('click', function () {
      $(".events-loader").show();

    // let logged_in = getCookieValue('od-token');
    if (!logged_in) {
      var logged_in = getCookieValue('od-token');
    }

    if (logged_in) {
    // Get the values of all 3 cookies
      let cookie_value = getCookieValue('od-token');
      let sub_value = getCookieValue('od-sub');
      let campus_value = getCookieValue('od-campus');

      let storedData = localStorage.getItem("od_saved_events");
      if ((storedData !== "undefined") && (storedData !== null)) {
        var od_saved_events = JSON.parse(storedData);
      }

      // Calculate difference between arrays
      // var arr_diff = original_events_arr.filter(function(obj) { return course_arr.indexOf(obj) == -1; });
      console.log('od_saved_events ', od_saved_events);

      const uniArr = [...(new Set(od_saved_events))]; // Sanity check for duplicates elements in array before sending to AWS

      var dataset = {
        sub: sub_value,
        EventID: uniArr
        
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
            $('.js-magic').fadeOut(500).delay(2000).fadeIn('slow');
            setTimeout(function(){
              $(".planner-add-success").text("Events were sucessfully added to your planner.").fadeIn(500).delay(1000).fadeOut('slow');
              $(".events-loader").delay(1000).fadeOut("slow");
            },500);
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
    }
    else show_hide_modal();
}); // Add to planner end

    // ---------------------
    // Handle My Plan click
    // ---------------------

    $('.js-journey').on('click', function (e) {
      let logged_in = getCookieValue('od-token');
       if (logged_in) {
         e.preventDefault();
        console.log("Logged in");
        window.location.href = "/openday/myplanner"; // ***  Redirect to planner
       }
       else{
        show_hide_modal();
       }
    });

}());

export default add_to_planner;