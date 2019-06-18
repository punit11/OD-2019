
 var add_to_planner = (function(){
    let course_count = 0;
      $(".owl-carousel").on("click", "span.add", function() {
      console.log("event added");
      $(this).toggleClass("selected");
      if ($(this).hasClass("selected")) {
      course_count += 1;
      }
      else course_count -= 1;
      $('.js-sessions-added').text(course_count);
  });
}());

export {add_to_planner};