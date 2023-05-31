let map, directionsService, directionsRenderer;
let sourceAutocomplete, destAutocomplete;
let distanceDiv;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.7749, lng: -122.4149},
        zoom: 13
            });
    google.maps.event.addListener(map, "click", function(event) {
        this.setOptions({scrollwheel: true});
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    sourceAutocomplete = new google.maps.places.Autocomplete(document.getElementById('source'));
    destAutocomplete = new google.maps.places.Autocomplete(document.getElementById('dest'));
    distanceDiv = document.getElementById('distance');
}

function calcRoute() {
    var source = document.getElementById('source').value;
    var dest = document.getElementById('dest').value;

    let request = {
        origin: source,
        destination: dest,
        travelMode: 'DRIVING',   
    };
    directionsService.route(request, function(result, status) {
        if (status == "OK") {
        directionsRenderer.setDirections(result);
        let distance = result.routes[0].legs[0].distance.text.replace("mil", "km");
        let duration = result.routes[0].legs[0].duration.text.replace("mins", "dəqiqə").replace("hours", "saat").replace("dakika","dəqiqə");
        distanceDiv.innerHTML = "Təxmini məsafə: " + distance + "<br>Təxmini vaxt: " + duration;
    } else {
        distanceDiv.innerHTML = "Xəta: Məsafəni tapmaq mümkün olmadı.";
    }
}); 
}