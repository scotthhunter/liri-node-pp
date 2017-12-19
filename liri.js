var Spotify = require("node-spotify-api");
var request = require("request");
var twitter = require("twitter");
var keys = require("./keys.js");
var query = process.argv[3];
//console.log(keys);
//var argv=  process.argv;
var command = process.argv[2];


function moviestuff() {


    var queryUrl = "http://www.omdbapi.com/?t= " + query + "&y=&plot=short&apikey=trilogy"
    var request = require('request');

    request(queryUrl, function(error, response, body) {
        var body = JSON.parse(body);
        //console.log('error:', error);
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log(body);
        console.log('Title:', body.Title);
        console.log('Years:', body.Year);
        console.log('Country:', body.Country);
        console.log('Source:', body.Ratings[0].Source + "Rating:" + body.Ratings[0].Value);
        console.log('rating:', body.Ratings[1]);
        if (!error) {
            for (var i = 0; i < body.Ratings.length; i++) {
                console.log('Source:', body.Ratings[i].Source + "Rating:" + body.Ratings[i].Value);

            }
        }
    });
};



if (command === "movie-this") {
    moviestuff();

} else if (command === "my-tweets") {
    fetchTwitter();
} else if (command === "spotify-this-song"){
	musicstuff();
}













//console.log(argv);



// var fs = require("fs");
// var twitter = require('twitter');
// var key= require('./key.js');


function fetchTwitter() {

    var client = new twitter(keys);
    var spotify = ("spotify");
    //var request = ("request");


    var params = { shunter87_name: 'nodejs', count: 20 };

    client.get('statuses/user_timeline', params, gotData);

    function gotData(error, tweets, response) {

        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        }
    }

};

//var Spotify = require('node-spotify-api');
function musicstuff(){
var spotify = new Spotify({
    id: "2c7a1aa37d3b49448f3a9c4602e5b530",
    secret: "f0721156cdd749a8b8598374b8e74604"
});

spotify.search({ type: 'track', query: query }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    //console.log(JSON.stringify(data));
console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
    console.log("The song's name: " + data.tracks.items[0].name);
    console.log("Song preview: " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name);


});
};

console.log(process.args);