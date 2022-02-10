// Yelp Api 

var searchFormEl = document.querySelector("#city-form")
var youtubeInputEl = document.querySelector(".musictype");
var youtubeContainerEL = document.querySelector("#youtube");
var newsInputEl = document.querySelector(".musictype");
var newsList = document.querySelector(".news-list")


// handle form submission
var formSubmitHandler = function(event) {
  event.preventDefault();

// var cityName = mapInputEl.value.trim();
  var genreName = youtubeInputEl.value.trim();
  var genreName = newsInputEl.value.trim();

  if (genreName) {
    getYoutubeData(genreName);
    youtubeInputEl.value = "";
  } if (genreName) {
    getNews(genreName);
    newsInputEl.value = "";
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

//Show News Api
var displayNews = function(articles, searchTerm) {
  var articlesItem = response.articles;
  if (articles.length === 0) {
    newsContainerEL.textContent = "No Articles found!";
    return;
  }

  newsContainerEL.textContent = "";

        for(var i=0; i< articlesItem.length; i++){

            var articleName = response.articles[i].title;
            var articleImg = response.articles[i].urlToImage;
            var articleDescription = response.articles[i].description;
            var newsContainerEl = document.createElement("a");
            newsContainerEl.classList = "card cell small-3 margin-top textcenter";
            newsList.appendChild(newsContainerEl);

            titleEl = document.createElement("h5");
            titleEl.textContent = articleName;
            newsImgEl = document.createElement("img");
            newsImgEl.setAttribute("src", articleImg);
            newsDescriptionEl = document.createElement("h5");
            newsDescriptionEl.textContent = articleDescription;

            newsContainerEl.appendChild(titleEl);
            newsContainerEl.appendChild(newsImgEl);
            newsContainerEl.appendChild(newsDescriptionEl);

        }
}

// Get News Api
var getNews = function(category) {
  var apiUrl = "https://newsapi.org/v2/everything?q=" + category + "&apiKey=64182e052fd1413bba8aa03676db4aa2"

  fetch(apiUrl).then(function(response) {

    if (response.ok) {
      response.json().then(function(data) {
        displayNews(data, category);
        console.log(data, category);
      });
    } else {
      alert("Error: Articles Not Found")
    }
  })
  .catch(function (error) {
    alert("Unable to connect to News");
  });

  console.log(category);
}

// add event listeners
searchFormEl.addEventListener("submit", formSubmitHandler)


