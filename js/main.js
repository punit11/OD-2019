  $(function() {
    $( ".Navbar__Link-toggle" ).on( "click", function() {
        console.log('Clicked');
      const navs = document.querySelectorAll(".Navbar__Items");
      navs.forEach(nav => nav.classList.toggle("Navbar__ToggleShow"));
    });

    $("button.accordion").click(function(){
      $(this).toggleClass("active");
      if($(this).hasClass('active')) {
        $(this).find('.button-text').text('Hide');
      } else {
        $(this).find('.button-text').text('Show');
      }
    });

    // Initialise modalVideo to play button
    $(".js-modal-btn").modalVideo({
      youtube:{
        autoplay:1,
				controls:0,
        nocookie: true, 
			}
    });

    // On click of button, make the page not scroll.
    $(".js-modal-btn").on('click', function(){
      $('html').addClass('modal-noscroll');
    })

    // Make site scroll again once video is closed.
    $(document).on('click','.js-modal-video-dismiss-btn', function(){
      if($('html').hasClass('modal-noscroll')) {
        $('html').removeClass('modal-noscroll');
      }
    })

  }); // on-ready end