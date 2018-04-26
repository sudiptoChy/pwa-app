/**
 * Author: Sudipto Chowdhury
 * Email: dip.chy93@gmail.com
 * Software Engineer, SELISE
 */

var map,
    currentPositionMarker,
    mapCenter = new google.maps.LatLng(14.668626, 121.24295),
    map;

// change the zoom if you want
function initializeMap()
{
    map = new google.maps.Map(document.getElementById('mapCanvas'), {
        zoom: 18,
        center: mapCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

function locError(error) {
    // tell the user if the current position could not be located
    alert("The current position could not be found!");
}

// current position of the user
function setCurrentPosition(pos) {
    currentPositionMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
        ),
        icon: './icons/car-icon.png',
        title: "Current Position"
    });
    map.panTo(new google.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
    ));
}

function displayAndWatch(position) {

    // set current position
    setCurrentPosition(position);

    // watch position
    watchCurrentPosition();
}

function watchCurrentPosition() {
    var positionTimer = navigator.geolocation.watchPosition(
        function (position) {
            setMarkerPosition(
                currentPositionMarker,
                position
            );
        });
}

function setMarkerPosition(marker, position) {
    console.log(marker);
    console.log(position);
    marker.setPosition(
        new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude)
    );
}

function initLocationProcedure() {
    initializeMap();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayAndWatch, function (error) {
            if (error.code == 1) {
                alert("Please allow location service.");
            }
        });
    } else {
        // tell the user if a browser doesn't support this amazing API
        alert("Your browser does not support the Geolocation API!");
    }
}

function registerServiceWorker () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('service-worker.js',  {scope: '/'})
            .then(function() { console.log('Service Worker Registered'); });
    }
}

// initialize with a little help of jQuery
$(document).ready(function() {
    initLocationProcedure();
    registerServiceWorker();
});