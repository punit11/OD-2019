  $(function() {
    $( ".Navbar__Link-toggle" ).on( "click", function() {
        console.log('Clicked');
      const navs = document.querySelectorAll(".Navbar__Items");
      navs.forEach(nav => nav.classList.toggle("Navbar__ToggleShow"));
    });
  }); // on-ready end