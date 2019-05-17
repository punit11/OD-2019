  $(function() {
    $( ".Navbar__Link-toggle" ).on( "click", function() {
        console.log('Clicked');
      const navs = document.querySelectorAll(".Navbar__Items");
      navs.forEach(nav => nav.classList.toggle("Navbar__ToggleShow"));
    });

    $("button.accordion").unbind().click(function(){
      $(this).toggleClass("active");
      if($(this).hasClass('active')) {
        $(this).find('.button-text').text('Hide');
      } else {
        $(this).find('.button-text').text('Show');
      }
      return false;
    });

    // Initialise modalVideo to play button
    $(".js-modal-btn").modalVideo({
      youtube:{
        autoplay:1,
				controls:1,
        nocookie: true,
			}
    });

    // On click of button, make the page not scroll.
    $(".js-modal-btn").on('click', function(){
      $('html').addClass('modal-noscroll');
    })

    // Make site scroll again once video is closed.
    $(document).on('click','.js-modal-video-dismiss-btn, .modal-video', function(){
      if($('html').hasClass('modal-noscroll')) {
        $('html').removeClass('modal-noscroll');
      }
    });

    // Make eventcards into a carousel
    $(".owl-carousel").owlCarousel({
      center: true,
      loop:true,
      margin:10,
      nav: true,
      stagePadding: 0,
      heightStyle: "content",
      responsiveClass:true,
      responsive:{
        0: {
          items: 1.15
        },
        576: {
          items: 2
        },
        768: {
          items: 2.25
        },
        1200:{
            items:2.5
        }
      }
    });

    //Dynamically set the positioning of the Navigation for Owl-Carousel
    var setCarouselNav = function(){

    }

    // Custom Select using select2 plugin
    var modifySelect = function(){
      $('.od-select').select2({
        minimumResultsForSearch: Infinity,
        width: 'resolve'
      });
      console.log('Select2 implemented and finished');
    }
    
    // var modifyOptions = function(){
    //   $('.select2-results__options').scrollbar();
    //   console.log('Scrollbars implemented and finished');
    // }



    modifySelect();
    $.when(modifySelect).done(function(){
      $('.od-select').fadeIn();
    });

    $('select').on('select2:open', function(e){
      $('.select2-results__options').scrollbar().parent().addClass('scrollbar-outer');
    });

    


  }); // on-ready end