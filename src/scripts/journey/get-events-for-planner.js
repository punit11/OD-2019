import {getCookieValue} from "./get-cookies";

function getOdEvents() {
    var getODresults;
    var cookie_value = getCookieValue('od-token');
    var sub_value = getCookieValue('od-sub');
    var dataset = {
        sub: sub_value
    };
    var jsonData = JSON.stringify(dataset);
    if (cookie_value) {
        $.ajax({
            url: 'https://33i3l7ehy8.execute-api.ap-southeast-2.amazonaws.com/production/od-2019',
            type: 'POST',
            data: jsonData,
            dataType: 'json',
            async: false,
            headers: {
                'cog-token': cookie_value
            },
            success: function (data) {
                console.log("success");
                getODresults = data;
                let original_events_arr = getODresults["EventID"];
                console.log('getODresults ', original_events_arr);

                // store array to localstorage
                localStorage.setItem("od_saved_events",  JSON.stringify(original_events_arr));
                // retrieve stored data (JSON stringified) and convert

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        }).done(function (msg) {
            console.log('done');
        });
        // return getODresults; Instead of returning results, store data in local storage



    } else {
        console.log('User is not logged in');
        return;
    }
}
export default getOdEvents;