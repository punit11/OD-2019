const youtubeApi = (function(){
    // Check what campus page is open and assign different videoIds accordingly
    var videoUrl = $('.js-video-popup img').data("video-id");

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
        console.log('inside onYouTubeIframeReady funciton');
        player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: videoUrl,
            // videoId: 'pdld32DYO7A',
            playerVars: {rel: 0},
            events: {
            'onReady': onPlayerReady
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
        // player.stopVideo();
        player.destroy();
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
        console.log('close video button clicked');
        stopVideo();
    });
}());

export {youtubeApi};