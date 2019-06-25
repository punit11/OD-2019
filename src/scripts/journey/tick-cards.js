import getOdEvents from "./get-events-for-planner";

var tick_cards = function () {
let saved_events = getOdEvents();
if (saved_events) {
let original_events_arr = saved_events["EventID"];
let evt_length = original_events_arr.length;
// console.log('Original Array ',events);

return {
    orig_array: original_events_arr,
    orig_array_len: evt_length
};

}
else console.log("No cookies found");
};
export default tick_cards;