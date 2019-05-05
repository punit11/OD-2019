  $(function() {
    $( ".Navbar__Link-toggle" ).on( "click", function() {
        console.log('Clicked');
      const navs = document.querySelectorAll(".Navbar__Items");
      navs.forEach(nav => nav.classList.toggle("Navbar__ToggleShow"));
    });

    $("button.accordion").click(function(){
      $(this).toggleClass("active");
    });

  }); // on-ready end