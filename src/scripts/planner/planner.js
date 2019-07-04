import {getCookieValue} from "../journey/get-cookies";
import {show_hide_modal} from "../journey/show-hide-modal";
import {planner_template} from '../templates';
import getOdEvents from '../journey/get-events-for-planner';

var login_check = (function() {
    console.log("CheckPoint 1");

    $("#campus-location").click(function() {
        console.log("Select clicked");
    });


    //  var cookie_value = getCookieValue('od-token');
    //  if (cookie_value) {
    //   console.log("Logged in");
    //   let storedData = localStorage.getItem("od_saved_events");
    //   if (storedData) {
    //     let od_saved_events = JSON.parse(storedData);
    //     console.log(od_saved_events);
    //   }
    //  }
    //  else{
    //   $( ".not-logged-in a" ).click(function(e) {
    //       e.preventDefault();
    //       show_hide_modal();
    //     });

    //   $(".planner-results").hide();
    //   $(".not-logged-in").show();
    //  }

    var global_myODEvents;
    var globals_wb_wrapper;
    var globals_wp_wrapper;
    var globals_wf_wrapper;
    var globals_bw_wrapper;
    console.log("CheckPoint 2");

    // var global_myODEvents = getOdEvents();

    // Check which campuses are present in users account
    function campus_present(...args) {
        if (global_myODEvents) {
            var campus_check = args.map(arg => global_myODEvents.find(e => e.includes(arg)) ? true : false);
            console.log('campus_check', campus_check);
            // if (campus_check[0]) {
            //     console.log('Fetch Waranbool JSON');
            //     fetchJSONfile('src/data/Warrnambool.json', 'wb-wrapper');
            // }

            // if (campus_check[1]) {
            //     console.log('Fetch WaranPonds JSON');
            //     fetchJSONfile('src/data/Waurn-ponds.json', 'wp-wrapper');
            // }

            // if (campus_check[2]) {
            //     console.log('Fetch WaterFront JSON');
            //     fetchJSONfile('src/data/Waterfront.json', 'wf-wrapper');
            // }

            // if (campus_check[3]) {
            //     console.log('Fetch Burwood JSON');
            //     fetchJSONfile('src/data/Burwood.json', 'bw-wrapper');
            // }

            if (campus_check[0]) {
                fetchJSONfile('//www.deakin.edu.au/__data/assets/file/0004/1919173/Warrnambool.json', 'wb-wrapper');
            }

            if (campus_check[1]) {
               fetchJSONfile('//www.deakin.edu.au/__data/assets/file/0006/1919175/Waurn-ponds.json', 'wp-wrapper');
            }

            if (campus_check[2]) {
               fetchJSONfile('//www.deakin.edu.au/__data/assets/file/0005/1919174/Waterfront.json', 'wf-wrapper');
            }

            if (campus_check[3]) {
               fetchJSONfile('//www.deakin.edu.au/__data/assets/file/0008/1917710/Burwood.json', 'bw-wrapper');
            }

        } else return false;

    }

    //   console.log("CheckPoint 3");

    function getEventsfromDB() {

        // global_myODEvents = getOdEvents();

        // campus_present('WB', 'WP', 'WF', 'BW');

        let storedData = localStorage.getItem("od_saved_events");
        if (storedData !== "undefined") {
            global_myODEvents = JSON.parse(storedData);
            console.log('myEvents', global_myODEvents);
            campus_present('WB', 'WP', 'WF', 'BW');
            // return $.Deferred().resolve();
        } // end getEventsfromDB



        // console.log("CheckPoint 4");
    }
    // AJAX call sent only for campuses present in user's account.
    function fetchJSONfile(dataURL, selector) {
        $.ajax({
            url: dataURL,
            async: false,
            dataType: 'json', //json data type
            success: function(data) {
                processData(data, selector);
            },
            error: function(xhr, status) {
                console.log("Error reading data");
            }
        });
    }

    // Function to find clashes, groupby and sort
    function arraySorter(wrapper_val) {
        wrapper_val.sort(function(a, b) {
            return new Date('1970/01/01 ' + a.Start_time) - new Date('1970/01/01 ' + b.Start_time);
        });
        var temp_st = {};
        // wrapper_val.forEach(o => temp_st[o.Start_time] ? o.clash = "This clashes with another session" : temp_st[o.Start_time] = o.Start_time);
        wrapper_val.forEach(o => {
            var diff = (new Date("1970-1-1 " + o.End_time) - new Date("1970-1-1 " + o.Start_time)) / 1000 / 60 / 60;
            //console.log(diff); // hours
            if (diff < 5) {
                o.all_day_evt = false;
                // o.duration = null;
                if (temp_st[o.Start_time]) o.clash = "This clashes with another session";
                else temp_st[o.Start_time] = o.Start_time;
            } else {
                //o.duration = '(all day event)';
                o.all_day_evt = true;
            }
        });
        return wrapper_val;
    }

    function groupBy(wrapper_val) {
        // Sort array - reverse x and y in return to change order
        wrapper_val.sort(function(x, y) {
            return y.all_day_evt - x.all_day_evt;
        });
        //console.log('Inside GroupBy', wrapper_val);
    }

    function processData(data, selector) {

        if (selector == 'wb-wrapper') {
            // Find array difference between full data array and planner array
            globals_wb_wrapper = data.filter(function(item) {
                return global_myODEvents.indexOf(item.Event_code) !== -1;
            });
            console.log('globals_wb_wrapper', globals_wb_wrapper);
            globals_wb_wrapper = arraySorter(globals_wb_wrapper); // Find clashes
            groupBy(globals_wb_wrapper); // GroupBy
        }
        if (selector == 'wp-wrapper') {
            // Find array difference between full data array and planner array
            globals_wp_wrapper = data.filter(function(item) {
                return global_myODEvents.indexOf(item.Event_code) !== -1;
            });
            console.log('globals_wp_wrapper', globals_wp_wrapper);
            globals_wp_wrapper = arraySorter(globals_wp_wrapper); // Find clashes
            groupBy(globals_wp_wrapper); // GroupBy
        }
        if (selector == 'wf-wrapper') {
            // Find array difference between full data array and planner array
            globals_wf_wrapper = data.filter(function(item) {
                return global_myODEvents.indexOf(item.Event_code) !== -1;
            });
            globals_wf_wrapper = arraySorter(globals_wf_wrapper); // Find clashes
            groupBy(globals_wf_wrapper); // GroupBy
            console.log('globals_wf_wrapper', globals_wf_wrapper);
        }
        if (selector == 'bw-wrapper') {
            // Find array difference between full data array and planner array
            globals_bw_wrapper = data.filter(function(item) {
                return global_myODEvents.indexOf(item.Event_code) !== -1;
            });

            globals_bw_wrapper = arraySorter(globals_bw_wrapper); // Find clashes
            groupBy(globals_bw_wrapper); // GroupBy
            console.log('globals_bw_wrapper', globals_bw_wrapper);
        }
    }

    // Get events on campus drop-down change
    function displayPlannerData(campus_value = 'Melbourne Burwood') {
        let msg = "Sorry, you have not selected any events for this campus.";
        //   console.log('Inside displayPlannerData', campus_value);
        if (campus_value == 'Warrnambool') {
            var opdate = $('.tiles-wrapper .warrnambool .date p').text(),
                optime = $('.tiles-wrapper .warrnambool .first-md p:last-child').text().split('–'),
                usetime = optime[0];

            if (globals_wb_wrapper) {
                $(".bg--round-pink").empty().text(globals_wb_wrapper.length);
                render_cards(globals_wb_wrapper);
                console.log('Warrnambool', globals_wb_wrapper);
            } else {
                $(".bg--round-pink").empty().text('0');
                $(".eventcard").hide();
                $(".no-events-selected").show();
            }

        } else if (campus_value == 'Geelong Waurn Ponds') {

            var opdate = $('.tiles-wrapper .waurn-ponds .date p').text(),
                optime = $('.tiles-wrapper .waurn-ponds .first-md p:last-child').text().split('–'),
                usetime = optime[0];

            if (globals_wp_wrapper) {
                $(".bg--round-pink").empty().text(globals_wp_wrapper.length);
                render_cards(globals_wp_wrapper);
                console.log('Geelong Waurn Ponds', globals_wp_wrapper);
            } else {
                $(".bg--round-pink").empty().text('0');
                $(".eventcard").hide();
                $(".no-events-selected").show();
            }

        } else if (campus_value == 'Geelong Waterfront') {

            var opdate = $('.tiles-wrapper .waterfront .date p').text(),
                optime = $('.tiles-wrapper .waterfront .first-md p:last-child').text().split('–'),
                usetime = optime[0];

            if (globals_wf_wrapper) {
                $(".bg--round-pink").empty().text(globals_wf_wrapper.length);
                render_cards(globals_wf_wrapper);
                console.log('Geelong Waterfront', globals_wf_wrapper);
            } else {
                $(".bg--round-pink").empty().text('0');
                $(".eventcard").hide();
                $(".no-events-selected").show();
            }

        } else {
            var opdate = $('.tiles-wrapper .burwood .date p').text(),
                optime = $('.tiles-wrapper .burwood .first-md p:last-child').text().split('–'),
                usetime = optime[0];

            if (globals_bw_wrapper) {
                $(".bg--round-pink").empty().text(globals_bw_wrapper.length);
                render_cards(globals_bw_wrapper);
                console.log('Burwood', globals_bw_wrapper);
            } else {
                $(".bg--round-pink").empty().text('0');
                $(".eventcard").hide();
                $(".no-events-selected").show();
            }
        }

        // Dynamically add the date and time depending on campus
        $('.strong-date').text(opdate + ' August');
        $('.strong-time').text(usetime);

        // ----- Render function
        function render_cards(render_data) {
            $(".eventcard").remove();
            $(".no-events-selected").hide();
            render_data.forEach(function(evt) {
                let template_planner = planner_template({
                    'evt_code': evt.Event_code,
                    'evt_title': evt.Title,
                    'evt_location': evt.Location,
                    'evt_start_time': evt.Start_time,
                    'evt_end_time': evt.End_time,
                    'evt_desc': evt.Description,
                    'evt_clash': evt.clash
                });
                $(".sessions-container").append(template_planner);
            });
        }
        // ----- Render function end

    }

    $("#campus-location").on('change', function() {
        var campus_value = $('#campus-location').val();
        console.log('campus_value is ', campus_value);
        getEventsfromDB();
        displayPlannerData(campus_value);
    });

    var cookie_value = getCookieValue('od-token');
    var sub_value = getCookieValue('od-sub');
    var campus_value = getCookieValue('od-campus');

    // Set Dropdown value
    //   if (campus_value) {
    //     console.log('pre-selected campus_value', campus_value);
    //       $("#campus-location").val(campus_value).trigger('change');
    //   }
    //   else console.log("Campus cooke value not avaliable");

    $(function() {
        if (campus_value) {
            $('#select2-campus-location-container').text(campus_value);
        } else {
            console.log('No campus value');
        }
    });

    if ((campus_value) && (cookie_value) && (sub_value)) {
        if ($("#not-logged-in-msg h2").text().trim().length) {
            $('#no-events-in-planner').hide();
        }

        console.log('Inside planner - cookie_value', cookie_value);
        console.log('Inside planner - campus_value', campus_value);
        console.log('Inside planner - sub_value', sub_value);
        
        $.when(getOdEvents()).then(getEventsfromDB());

        //$.when(deferred_EFDB).done(function(){displayPlannerData(campus_value);});
        let storedData = localStorage.getItem("od_saved_events");
        if (storedData !== "undefined") {
            displayPlannerData(campus_value);
        }
        //   else $('#no-events-in-planner').show();

    } else {
        $("#not-logged-in-msg a").click(function(e) {
            e.preventDefault();
            show_hide_modal();
        });

        $(".planyrday-wrapper").addClass('not-logged');
        $(".planner-results").hide();
        $("#not-logged-in-msg").show();
    }

    // -------------------------
    // Remove events from planner
    // -------------------------
    $(".sessions-container").on("click", ".remove-from-planner", function(e) {
        // if ((id_of_button_clicked == 'remove-frm-planner') || (id_of_button_clicked == 'remove-frm-myplan')) {
        e.preventDefault();
        console.log("Clicked 21");
        var get_count = parseInt($(".bg--round-pink").text());
        // var clickedEventID_delete = [$(this).attr('data-eventid')];
        var clickedEventID_delete_local = $(this).data("eventid");
        var clickedEventID_delete = [$(this).data("eventid")];
        console.log('clickedEventID_delete', clickedEventID_delete);
        var event_to_remove = $(this).closest('.eventcard');
        var dataset_post = {
            sub: sub_value,
            EventID: clickedEventID_delete
        };
        //var JSONObject= {"uname":uname, "password":password };
        var jsonData_post = JSON.stringify(dataset_post);
        // console.log('jsonData_post nefore AJAX call ', jsonData_post);
        // console.log('cookie_value nefore AJAX call ', cookie_value);
        $.ajax({
            url: 'https://33i3l7ehy8.execute-api.ap-southeast-2.amazonaws.com/production/od-2019',
            type: 'DELETE',
            data: jsonData_post,
            dataType: 'json',
            async: false,
            headers: {
                'cog-token': cookie_value
            },
            success: function(data) {
                console.log("data", data);
                console.log('Event removed from myPlan page');
                $(event_to_remove).fadeOut(1000);
                if (get_count > 0) {
                    get_count -= 1;
                    $(".bg--round-pink").text(get_count);
                }
                // Remove event from local storage
                let storedData = localStorage.getItem("od_saved_events");
                if ((storedData !== "undefined") && (storedData !== null)) { // Remove events from existing arr if there are events present already
                    // console.log("clickedEventID_delete ", clickedEventID_delete);
                    let od_saved_events = JSON.parse(storedData);
                    od_saved_events = od_saved_events.filter(item => item !== clickedEventID_delete_local); // Remove unclicked event from arr 
                    localStorage.setItem('od_saved_events', JSON.stringify(od_saved_events));
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        }).done(function(msg) {
            console.log('done');
        });
    }); // End remove from planner
}());

export default login_check;