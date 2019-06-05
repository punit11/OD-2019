// AJAX call
// $.ajax({
//     url: "https://www.deakin.edu.au/__data/assets/file/0009/1379781/Burwood.json"
//   })
//   .done(function (data) {
//     courseFinder2(data);
//   })
//   .fail(function (jqXHR, textStatus, errorThrown) {
//     console.log(textStatus + ": " + errorThrown);
//   });



  function makeAjaxCall(url){
    return $.ajax({
       url : url,
       dataType : "json"
    });
   }
   export default makeAjaxCall;