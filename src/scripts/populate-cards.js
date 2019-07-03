
import makeAjaxCall from "./model";
import "../data/Burwood.json";
import {dd_template, card_template} from './templates';
// import {owlCarousel} from "owl.carousel";
import bind_owl from "./owl-carousel";
import render_ticks from "./journey/render-ticks";

function populate_cards(session,selected_ia,caller) {
       session = session || ''; //set default to all
       selected_ia = selected_ia || ''; //set default to all
       caller = caller || ''; //set default to all

      //  console.log("session ", session);
      //  console.log("selected_ia ", selected_ia);
       var URL = "src/data/Burwood.json";

      // if (window.location.href.indexOf("burwood") > -1) {
      //   URL = "https://www.deakin.edu.au/__data/assets/file/0008/1917710/Burwood.json";
      //       }
      //   else if (window.location.href.indexOf("warrnambool") > -1) {
      //   URL = "https://www.deakin.edu.au/__data/assets/file/0004/1919173/Warrnambool.json";
      //       }
      //   else if (window.location.href.indexOf("waterfront") > -1) {
      //   URL = "https://www.deakin.edu.au/__data/assets/file/0005/1919174/Waterfront.json";
      //       }
      //   else URL = "https://www.deakin.edu.au/__data/assets/file/0006/1919175/Waurn-ponds.json";
    

       makeAjaxCall(URL)
      .done(function (result) {
        // console.log("data loading done");
        // courseFinder2(data);
        let dd_arr= result;
        dd_arr.sort(function (a, b) {
          return new Date('1970/01/01 ' + a.Start_time) - new Date('1970/01/01 ' + b.Start_time);
        });
        // console.log('result', result);
        // Extract IA's from returned JSON & bind drop-down template
        let session_type = 'Course information session';
        let dd_arr_cleaned = [...new Set(dd_arr.filter(o => o.Session_type === session_type && o.Interest_area.trim() !== '').reduce((c, v) => c.concat(v.Interest_area.split(';')), []).map(o => o.trim()))];
        dd_arr_cleaned.sort();
        // console.log('dd_arr_cleaned ', dd_arr_cleaned);

        if ($("#course-area option").length < 1) {
        $("#course-area").empty();
        $('#course-area').append($("<option/>").val('').text("Please select an interest area"));
        dd_arr_cleaned.forEach(function (dd_val) {
        let template_dd = dd_template({'val': dd_val});
        $("#course-area").append(template_dd);
        });
        }

        let my_course_data = result;
        // Bind drop-down template for -- Course Info Sessions --
        let x = $('#popular-courses').val();
        if (x) {
        selected_ia = x;
        var course_info_arr = my_course_data.filter(o => o.Session_type === 'Course information session' && o.Session_type.trim() !== '' && o.Session_start.includes(session)  && o.Pre_selected.includes(selected_ia));
        }
        else {
          var course_info_arr = my_course_data.filter(o => o.Session_type === 'Course information session' && o.Session_type.trim() !== '' && o.Session_start.includes(session)  && o.Interest_area.includes(selected_ia));
        }
        // console.log('course_info_arr ', course_info_arr.length);
        render_cards(course_info_arr, '.course-info-carousel');

        // Bind drop-down template for -- Tour & Exp Info Sessions --
        if (x) {
        selected_ia = x;
          var tours_exp_arr = my_course_data.filter(o => (o.Session_type === 'Tour' || o.Session_type === 'Experience') && o.Session_type.trim() !== '' && o.Session_start.includes(session) && o.Pre_selected.includes(selected_ia));
          }
        else {
          var tours_exp_arr = my_course_data.filter(o => (o.Session_type === 'Tour' || o.Session_type === 'Experience') && o.Session_type.trim() !== '' && o.Session_start.includes(session) && o.Interest_area.includes(selected_ia));
        }
        console.log('tours_exp_arr ', tours_exp_arr.length);
        render_cards(tours_exp_arr, '.tours-exp-carousel');

        // Bind drop-down template for -- General Info Sessions --
        if (x) {
        selected_ia = x;
          var gen_info_arr = my_course_data.filter(o => o.Session_type === 'General information session' && o.Session_type.trim() !== '' && o.Session_start.includes(session) && o.Pre_selected.includes(selected_ia));
          }
        else {
        var gen_info_arr = my_course_data.filter(o => o.Session_type === 'General information session' && o.Session_type.trim() !== '' && o.Session_start.includes(session));
        }
        // console.log('gen_info_arr ', gen_info_arr.length);
        render_cards(gen_info_arr, '.gen-info-carousel');
        $("#gen_evt_count").text(gen_info_arr.length);

        // ----- Render function
        function render_cards(render_data, render_loc) {
        render_data.forEach(function (evt) {
        let template_dd = card_template({
          'evt_code': evt.Event_code,
          'evt_title': evt.Title,
          'evt_location': evt.Location,
          'evt_start_time': evt.Start_time,
          'evt_end_time': evt.End_time,
          'evt_desc': evt.Description
        });
        $(render_loc).append(template_dd).hide(); // Hide the cards initially to prevent ugly resizing
        });
      }
    //  console.log("template loading done");
    //  console.log("callback", callback);
    //  callback();

    // $(function() {

      $(function() {
        // if $(".owl-stage") {
          let browser = navigator.userAgent.toLowerCase(); // Firefox hack
          if (browser.indexOf('firefox') > -1) {
          if($.trim($(".owl-stage").html())=='') {
            populate_cards();
            bind_owl();
            render_ticks();
            return false;
        }
      }

        bind_owl();
        // Populate counters
        $("#course_evt_count").text(course_info_arr.length);
        $("#tour_evt_count").text(tours_exp_arr.length);
        render_ticks();
    });

    })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus + ": " + errorThrown);
    }); // fail end

// Tick any pre-selected cards for a logged-in user
}
populate_cards();

export {populate_cards};