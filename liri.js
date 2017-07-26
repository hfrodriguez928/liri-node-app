//Dependencies
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify({
  id: "37c8d48b6cb342b0a6cac44b0822a61d",
  secret: "4e0797db8ffb4cb9ad48d6673732b42f"
});
var request = require("request");
 

// Twitter
var hayleysTweeets = function () {
  console.log("twitter is working");
    var params = {
        screen_name: 'SbucksEavesdrop'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(JSON.stringify(tweets[i].created_at, undefined, 2));
                console.log(JSON.stringify(tweets[i].text, undefined, 2));
            }
        }
    });
}

// Spotify
var hayleysSpotify = function () {
  var getSong = "";
  for (var i=3; i<process.argv.length;i++){
  console.log(JSON.stringify(process.argv[i], undefined, 2));
  if(i>3){
  getSong+=" " + process.argv[i];
  }else{
    getSong = process.argv[i];
  }
}
  spotify.search({"type":"track","query":getSong,"limit":1}, function(err, data) {
  if (err) {
    console.log(err);
    return console.log('Error occurred: ' + err);
  }

var getArtistNames = function(artist) {
  return artist.name;
};

var arrayOfResults = data.tracks.items;
arrayOfResults.forEach(function(track){
  console.log(track.preview_url);
  console.log(track.name);
  console.log(track.album.name);
  console.log(track.artists.map(getArtistNames));
})

});
}




//OMDB
var getMovies = function (){ 
var movieName = "";
if (process.argv[3] !== undefined) {
  for (var i=3; i<process.argv.length;i++){
    //console.log(JSON.stringify(process.argv[i], undefined, 2));
    if(i>3){
    movieName+="+" + process.argv[i];
    }else{
      movieName = process.argv[i];
    }
  }
} else {
  movieName = "Mr. Nobody";
}
request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received   
  // console.log('body:', JSON.parse(body)); 
  var myResults = JSON.parse(body);
  console.log(myResults.Title);
  console.log(myResults.Year);
  console.log(myResults.Rated);
  console.log(myResults.imdbRating);
  console.log("Rotten Tomatoes: " + myResults.Ratings[1].Value);
  console.log(myResults.Country);
  console.log(myResults.Language);
  console.log(myResults.Plot);
  console.log(myResults.Actors);
});
 
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
}

//Read file
var writeToLog = function(data) {
  fs.appendFile("random.txt", '\r\n\r\n');

  fs.appendFile("random.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
}
var readMe = function (){
    fs.readFile("random.txt", "utf8", function(error, data) {

      if (error) {
        return console.log(error);
      }
    console.log(data);
    writeToLog(data);
    var dataArr = data.split(',')

if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      pick(dataArr[0]);
    }
    });
  };




// choices 
var pick = function (caseData) {
    switch (caseData) {
        case "my-tweets":
            hayleysTweeets();
            break;
        case "spotify-this-song":
            hayleysSpotify();
            break;
        case "movie-this":
            getMovies();
            break;
        case "do-what-it-says":
            readMe();
            break;
        default:
            console.log("LIRI doesn't know that");
    }
}
//---Main Process 
pick(process.argv[2], process.argv[3], process.argv[4]);
