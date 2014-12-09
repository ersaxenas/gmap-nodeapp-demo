/**
 * Created by saurabh on 11/30/14.
 */
function initialize() {
    var mapOptions = {
        center: { lat: -34.397, lng: 150.644},
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('dmap'),
        mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);