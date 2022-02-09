// Yelp Api 

var searchFormEl = document.querySelector("#city-form")
var youtubeInputEl = document.querySelector("#music-type");
var mapInputEl = document.querySelector("#city-name");
var youtubeContainerEL = document.querySelector("#youtube");

// handle form submission
var formSubmitHandler = function(event) {
  event.preventDefault();

// var cityName = mapInputEl.value.trim();
  var genreName = youtubeInputEl.value.trim();

  if (genreName) {
    getYoutubeData(genreName);
    youtubeInputEl.value = "";
    mapInputEl.value = "";
  } else {
    alert("Please enter a valid response")
  }

  console.log(event);
}

// display data to doc
var displayYoutube = function(videos, searchTerm) {
  var videosItem = videos.items;
  if (videos.length === 0) {
    youtubeContainerEL.textContent = "No videos found!";
    return;
  }

  youtubeContainerEL.textContent = "";
  
  for (var i = 0; i < videosItem.length; i++) {
    // set variables
    var videoName = videosItem[i].snippet.title;
    var channelName = videosItem[i].snippet.channelTitle;
    var videoThumbnail = videosItem[i].snippet.thumbnails.medium.url;
    var videoLink = videosItem[i].id.videoId;
    console.log(videoName, channelName, videoThumbnail);

    // create and print elements to page
    var vidContainerEl = document.createElement("a");
    vidContainerEl.classList = "card cell small-3 margin-top textcenter";
    vidContainerEl.setAttribute("href", "https://www.youtube.com/watch?v=" + videoLink);

    youtubeContainerEL.appendChild(vidContainerEl);
    // create elements to hold video name, channel name, and img
    titleEl = document.createElement("h5");
    titleEl.textContent = videoName;
    vidImgEl = document.createElement("img");
    vidImgEl.setAttribute("src", videoThumbnail);
    channelNameEl = document.createElement("h5");
    channelNameEl.textContent = channelName;

    // append to container
    vidContainerEl.appendChild(titleEl);
    vidContainerEl.appendChild(vidImgEl);
    vidContainerEl.appendChild(channelNameEl);

  }
}

// get data from yelp api
var getYoutubeData = function(category) {
  // format yelp api url
  var apiUrl = "https://youtube.googleapis.com/youtube/v3/search?q=" + category + "&part=snippet&maxResults=6&key=AIzaSyBesPKCUcxbpbCE_P6EIs5Exiz4ZmMW8Sc";

  // make request to url with nested then function
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayYoutube(data, category);
        console.log(data, category);
      });
    } else {
      alert("Error: YouTube Users Not Found")
    }
  })
  .catch(function(error) {
    alert("Unable to connect to YouTube");
  });

  console.log(category);
};

// getYoutubeData();


// add event listeners
searchFormEl.addEventListener("submit", formSubmitHandler)

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

