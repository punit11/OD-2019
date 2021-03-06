
import getOdEvents from "./get-events-for-planner";
import {getCookieValue} from "./get-cookies";
var render_ticks = function () {
    "use strict";
    var logged_in = getCookieValue('od-token');
    if (logged_in) {
    getOdEvents();
    }
    // retrieve stored data (JSON stringified) and convert
    // let saved_events = getOdEvents();
    console.log("Inside tick-cards", "Comma works");
    var storedData = localStorage.getItem("od_saved_events");

    console.log('storedData ', typeof(storedData), storedData);
    if ((storedData !== "undefined") && (storedData !== null)) {
        // if (storedData) {
        console.log('Inside Storeddata');
        let od_saved_events = JSON.parse(storedData);
        console.log("Fetched from lcoal storage", od_saved_events);
        let original_events_len = od_saved_events.length;
        // $(".num--pink--circle").text(original_events_len);

    od_saved_events.forEach(function (evt_val) {
    // console.log('evt_val ', evt_val);
    $("span[data-eventid='"+evt_val+"']").addClass("event-added");
    });
    // $('.js-sessions-added').text(original_events_len);
    // $('.btn.add-to-planner').html('Update Planner');
    }
};

export default render_ticks;