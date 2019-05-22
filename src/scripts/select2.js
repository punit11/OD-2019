import $ from "jquery";
import {select2} from "select2";
import {jQueryScrollbar} from "jquery.scrollbar";

const modifySelect = (function(){
    $('.od-select').select2({
      minimumResultsForSearch: Infinity,
      width: 'resolve'
    });
    console.log('Select2 implemented and finished');
  
  
//   modifySelect();
  $.when(modifySelect).done(function(){
    $('.od-select').fadeIn();
  });
}());

const fancy_scrollbar = $('select').on('select2:open', function(e){
    $('.select2-results__options').scrollbar().parent().addClass('scrollbar-outer');
  });

export {modifySelect, fancy_scrollbar};