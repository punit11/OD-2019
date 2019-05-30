import $ from "jquery";

const youtubeApi = (function(){
    //Youtube
    // 1. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 2. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            // height: '489',
            // width: '870',
            height: '100%',
            width: '100%',
            videoId: 'pdld32DYO7A',
            playerVars: {rel: 0},
            events: {
            'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
            }
        });
    }

    // 3. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 4. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function stopVideo() {
        player.stopVideo();
    }

    $('.js-video-popup').on('click', function(){
        onYouTubeIframeAPIReady();
        console.log('button clicked');
        if(!$('html').hasClass('noscroll')){
            $('html').addClass('noscroll');
        } else {
            $('html').removeClass('noscroll');
        }
    });

    $('#campus-video, #videoModal button.close').on('click', function(){
        $('html').removeClass('noscroll');
        // player.stopVideo();
        console.log('stop video');
        stopVideo();
    });
}());

export {youtubeApi};