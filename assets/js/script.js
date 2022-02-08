// Map Variable
var map = L.map('map').setView([38.58, -121.5], 13);
//City Variable
var cityNameEl = document.querySelector("#city-name");

// Map 
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibXJwcm90c3l1ayIsImEiOiJja3o3dnhpeHIwZ3g1Mm9tbXdsZTRsY3IzIn0.Lrx09QwyMOJGTdqtHrE3eg'
}).addTo(map);
// Map Search
L.Control.geocoder().addTo(map);

