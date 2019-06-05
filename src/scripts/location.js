import makeAjaxCall from "./model";
import "../data/Warnnambool.json";
import {dd_template, card_template} from './templates';
import bind_owl from "./owl-carousel";

var getdata = (function() {
    var session = session || ''; //set default to all
//    var URL = "https://api.github.com/search/repositories?sort=stars&q=javascript&per_page=10&page=1";
    var URL = "src/data/Warnnambool.json";
       makeAjaxCall(URL)
      .done(function (result) {
        // courseFinder2(data);
        let dd_arr= result;
        // console.log('result', result);
      
        // Extract IA's from returned JSON & bind drop-down template
        let session_type = 'Course information session';
        let dd_arr_cleaned = [...new Set(dd_arr.filter(o => o.Session_type === session_type && o.Interest_area.trim() !== '').reduce((c, v) => c.concat(v.Interest_area.split(',')), []).map(o => o.trim()))];
        dd_arr_cleaned.sort();
        console.log('dd_arr_cleaned ', dd_arr_cleaned);
        dd_arr_cleaned.forEach(function (dd_val) {
        let template_dd = dd_template({'val': dd_val});
        $("#course-area").append(template_dd);
        });
        
        let my_course_data = result;

        // Bind drop-down template for -- Course Info Sessions --
        let course_info_arr = my_course_data.filter(o => o.Session_type === 'Course information session' && o.Session_type.trim() !== '' && o.Start_time.includes(session));
        console.log('course_info_arr ', course_info_arr);
        render_cards(course_info_arr, '.course-info-carousel');

        // Bind drop-down template for -- Tour & Exp Info Sessions --
        let tours_exp_arr = my_course_data.filter(o => (o.Session_type === 'Tour' || o.Session_type === 'Experience') && o.Session_type.trim() !== '' && o.Start_time.includes(session));
        console.log('tours_exp_arr ', tours_exp_arr);
        render_cards(tours_exp_arr, '.tours-exp-carousel');

        // Bind drop-down template for -- General Info Sessions --
        let gen_info_arr = my_course_data.filter(o => o.Session_type === 'General information session' && o.Session_type.trim() !== '' && o.Start_time.includes(session));
        console.log('gen_info_arr ', gen_info_arr);
        render_cards(gen_info_arr, '.gen-info-carousel');

        // ----- Render function
        function render_cards(render_data, render_loc) {
          var content = '';
        render_data.forEach(function (evt) {
        let template_dd = card_template({
          'evt_title': evt.Title,
          'evt_location': evt.Location,
          'evt_start_time': evt.Start_time,
          'evt_end_time': evt.End_time,
          'evt_desc': evt.Description
        });
        $(render_loc).append(template_dd);
        // content += template_dd;
        });
      }
      
    })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus + ": " + errorThrown);
    }); // fail end
    
    $( document ).ready(function() {
      bind_owl();
    });

}());
export default getdata;
