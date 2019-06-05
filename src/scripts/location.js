var initMap = (function() {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCJvTU8yZaMmh_Ji_Zdg-V2VByh-3ze2xI&callback=initMap';
    document.head.appendChild(googleMapsScript);
    
    // The location of burwood
    var burwood = {lat: -37.846995, lng: 145.114987};
    // The map, centered at burwood
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: burwood});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: burwood, map: map});
}());

export { initMap };