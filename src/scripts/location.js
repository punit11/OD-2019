var secondaryNavbar_scroll = $(function() {
    $(".secondary__nav a").on("click", function(e) {
        e.preventDefault();
        let clicked_class = $(this).attr("href");
        while (clicked_class.charAt(0) === '#') {
            clicked_class = clicked_class.substr(1);
        }
        console.log(clicked_class);
        custom_scroll(clicked_class, 750);
  
        function custom_scroll(ele, ani_time) {
            console.log('ele  ', ele);
  
            let ele_offset = $('[name=' + ele + ']');
            console.log('scrollTop = ' + ele_offset.offset().top);
            console.log('ele_offset ', ele_offset);
            $("html, body").animate({ scrollTop: ele_offset.offset().top }, ani_time);
        }
    });
}());

export {secondaryNavbar_scroll};
