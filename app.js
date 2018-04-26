// var position = [40.748774, -73.985763];

var position = [];


function geolocateUser (callback) {
    if (navigator.geolocation) {
        var positionOptions = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(function ( pos ) {
            position[0] = pos.coords.latitude;
            position[1] = pos.coords.longitude;
            console.log(position);
            callback(position);
        },null, positionOptions);
    }
}
function initialize() {
    geolocateUser(function (){
        var latlng = new google.maps.LatLng(position[0], position[1]);
        var myOptions = {
            zoom: 16,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);

        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Latitude:"+position[0]+" | Longitude:"+position[1]
        });
        setTimeout(function (  ) {
            var position1 = [];
            position1[0] = 23.757551;
            position1[1] = 90.383397;
            console.log(position1);
            transition(position1);
        },5000)

        google.maps.event.addListener(map,'click', function(event) {
            var result = [event.latLng.lat(), event.latLng.lng()];
            transition(result);
        });

    });


}

//Load google map
google.maps.event.addDomListener(window, 'load', initialize);


var numDeltas = 100;
var delay = 5; //milliseconds
var i = 0;
var deltaLat;
var deltaLng;

function transition(result){
    i = 0;
    deltaLat = (result[0] - position[0])/numDeltas;
    deltaLng = (result[1] - position[1])/numDeltas;
    moveMarker();
}

function moveMarker(){
    position[0] += deltaLat;
    position[1] += deltaLng;
    var latlng = new google.maps.LatLng(position[0], position[1]);
    marker.setTitle("Latitude:"+position[0]+" | Longitude:"+position[1]);
    marker.setPosition(latlng);
    if(i!=numDeltas){
        i++;
        setTimeout(moveMarker, delay);
    }
}