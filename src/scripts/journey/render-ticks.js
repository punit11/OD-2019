import tick_cards from "./tick-cards";

var render_ticks = function () {

    // retrieve stored data (JSON stringified) and convert
    // let saved_events = getOdEvents();
    console.log("Inside tick-cards", "Comma works");
    var storedData = localStorage.getItem("od_saved_events");
    if (storedData) {
        let od_saved_events = JSON.parse(storedData);
        console.log("Fetched from lcoal storage", od_saved_events);
        let original_events_len = od_saved_events.length;

    od_saved_events.forEach(function (evt_val) {
    // console.log('evt_val ', evt_val);
    $("span[data-eventid='"+evt_val+"']").addClass("selected");
    });
    $('.js-sessions-added').text(original_events_len);
    $('.btn.add-to-planner').html('Update Planner');
    }

};

export default render_ticks;