// Yelp Api 

var searchFormEl = document.querySelector("#city-form")
var youtubeInputEl = document.querySelector(".musictype");
var youtubeContainerEL = document.querySelector("#youtube");
var newsContainerEL = document.querySelector("#news-list")
var newsInputEl = document.querySelector(".musictype");

// get the modal
var modal = document.getElementById("myModalNews");
var modal = document.getElementById("myModalArticle");
var modal = document.getElementById("myModalYoutube");
var modal = document.getElementById("myModalVideo");
var modal = document.getElementById("myModalValid");

var searchResults = {};

// handle form submission
var formSubmitHandler = function(event) {
  event.preventDefault();

  var genreName = youtubeInputEl.value.trim();
  var genreName = newsInputEl.value.trim();

  if (genreName) {
    getYoutubeData(genreName);
    youtubeInputEl.value = "";
    getNews(genreName);
    newsInputEl.value = "";
  } else {
    $('#myModalValid').modal('show');
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
    vidContainerEl.setAttribute("target", "_blank");

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
  var apiUrl = "https://youtube.googleapis.com/youtube/v3/search?q=" + category + "&part=snippet&maxResults=6&key=AIzaSyCYnUFNOBqY9wkENTkdnMiu9xWlbJnRHBk";

  // make request to url with nested then function
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayYoutube(data, category);
        console.log(data, category);
      });
    } else {
      $("#myModalVideo").modal('show');
    }
  })
  .catch(function(error) {
    $('#myModalYoutube').modal('show');
    
  });

  console.log(category);
};

//Show News Api
var displayNews = function(articles, response) {
  console.log(articles);
  if (articles.length === 0) {
    newsContainerEL.textContent = "No Articles found!";
    return;
  }

  newsContainerEL.textContent = "";

        for(var i=0; i< articles.data.length; i++){
            var articleName = articles.data[i].title;
            var articleImg = articles.data[i].image_url;
            var articleDescription = articles.data[i].description;
            var articleLink = articles.data[i].url;
            var newsContainer = document.createElement("a");
            newsContainer.setAttribute("href", articleLink)
            newsContainer.setAttribute("target", "_blank");
            newsContainer.classList = "card cell small-3 margin-top textcenter";
            newsContainerEL.appendChild(newsContainer);
            titleEl = document.createElement("h5");
            titleEl.textContent = articleName;
            newsImgEl = document.createElement("img");
            newsImgEl.setAttribute("src", articleImg);
            newsDescriptionEl = document.createElement("h5");
            newsDescriptionEl.textContent = articleDescription;

            newsContainer.appendChild(titleEl);
            newsContainer.appendChild(newsImgEl);
            newsContainer.appendChild(newsDescriptionEl);

        }
        console.log(articles);
}

// Get News Api
var getNews = function(category) {
  var newsUrl = 'https://api.thenewsapi.com/v1/news/all?api_token=q3R3bJCo4uZl6fKHXFT1QaQ5I7SOcD2pepTJKPl9&search=' + category + '&language=en&limit=3';


  fetch(newsUrl).then(function(response) {

    if (response.ok) {
      response.json().then(function(data) {
        displayNews(data, category);
        console.log(data, category);
      });
    } else {
      $('#myModalArticle').modal('show');
    }
  })
  .catch(function (error) {
    $('#myModalNews').modal('show');
  });

  console.log(category);
}
// when the user clicks anywhere outside of the modal, close it 
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// local storage
/*
var loadSearch = function() {
  searchResults = JSON.parse(localStorage.getItem("searchResults"));
}
console.log(loadSearch);
var saveSearch = function() {
  localStorage.setItem("searchResults", JSON.stringify(searchResults));
} 
console.log(saveSearch);
*/
// add event listeners
searchFormEl.addEventListener("submit", formSubmitHandler)


