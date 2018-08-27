// getting the required packages
var Spotify = require('node-spotify-api');
var request = require('request');
var dotEnv  = require('dotenv').config();
var keys    = require('./key.js');
var moment  = require('moment');
var fs      = require('fs');
var inquirer = require ('inquirer');

// setting a variable for action
var action;
// setting a variable for searching name, this is initialized with empty string and would be updated later
var searchName = "";
// setting up a list of acceptable actions
var acceptable = ["concert-this", "spotify-this-song", "movie-this","do-what-it-says"];
// creating a new instance of spotify object 
var spotify = new Spotify (keys.spotify);

// collecting inputs from user
getInput();
console.log("searchName  is     " , searchName);
// running action item accordingly
toDo();


// Function to grab the inputs from console, exclude the first 2 elements, update the global variable "action" to the value of third elements, and concatenates the rest to an api search format
function getInput (){
    var data =  process.argv;
    // if user dosn't enter the action and the thing to search
    if (data.length === 2 ){
        askForAction();
    } 
    else if (data.length === 3){
        action = data[2];
        if (validate (action)){
            console.log("you didn't enter a search item for the action, default would be used if applicable");

            if (action === "spotify-this-song"){
                searchName = "The+Sign";
            }
            if (action === "movie-this"){
                searchName = "Mr.+Nobody";
            }
            // if (action !== "do-what-it-says"){
            //     //ask user to enter a search item
            //     askForSrchItem();
            // }   
        } else {
            console.log ("seems that the action you asked is not among our list of acceptable actions");
            askForAction();
        }    
    } else {
        action = data[2];
        searchName = data[3];
        for(var i = 4; i < data.length ; i++){
            searchName = searchName + " " + data[i];
        }
        console.log("searchName  is     " , searchName);
    }  
    return searchName;
}

function toDo () {
    switch (action){
        case "concert-this" :
            findEvent();
            break;
        case "spotify-this-song" :
            callSpotify();
            break;
        case "movie-this" :
            findMovie();
            break;  
        case "do-what-it-says" :
            doRandom();
            break;     
    }
}

function validate (str){
    if (acceptable.includes(str)){
        return true;
    }
    return false;
}

function askForAction (){
    inquirer.prompt([
        {
            type: "list",
            message: "you need to tell us what you want to do, Do you want a list of options?",
            choices: ["concert-this", "spotify-this-song", "movie-this","do-what-it-says"],
            name: "option"
        },
    ]).then(function(inquirerResponse) {
        action = inquirerResponse.option;
        if(action === "do-what-it-says" ){
            toDo();
        } else {
            askForSrchItem();
        }    
    });
}

// function askForBoth (){
//     inquirer.prompt([
//         {
//             type: "list",
//             message: "you need to tell us what you want to do, Do you want a list of options?",
//             choices: ["concert-this", "spotify-this-song", "movie-this","do-what-it-says"],
//             name: "option"
//         },
//         {
//             type: "input",
//             message: "What you wanna search?",
//             name: "search"
//         }
//     ]).then(function(inquirerResponse) {
//         action = inquirerResponse.option;
//         searchName = inquirerResponse.search;
//         toDo();
//     });
// }

function askForSrchItem (){
    inquirer.prompt([
        {
            type: "input",
            message: "What you wanna search?",
            name: "search"
        }
    ]).then(function(inquirerResponse) {
        searchName = inquirerResponse.search;
        toDo();
    });
}

// spotify
//   .request('https://api.spotify.com/v1/tracks/3oCJJksC12uFxkt3RQ7rbV')
//   .then(function(data) {
//     console.log("check the sign" ,data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });

function callSpotify(){

    spotify.search({ type: 'track', query: searchName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log ("data     " , data.tracks.items[0]);

        // for (var j = 0 ; j < 20; j++){
        var artists = data.tracks.items[0].album.artists;
        displayHd("Artist(s) name");
        for (var i = 0 ; i < artists.length ; i++){
            displayCnt(artists[i].name);
        }

        displayHd("Name Of the Songs");
        displayCnt(data.tracks.items[0].name);

        
        displayHd("External Url");
        displayCnt(data.tracks.items[0].external_urls.spotify);

        displayHd("Preview Link");
        displayCnt(data.tracks.items[0].preview_url);


        displayHd("Album Name");
        displayCnt(data.tracks.items[0].album.name);
    // }
    });
}
function findEvent() {
    request("https://rest.bandsintown.com/artists/" + searchName + "/events?app_id=codingbootcamp", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // console.log("-----------------")
            // Parse the body of the site and recover just the concert info
            console.log("The concert info is: " , JSON.parse(body));
            var data = JSON.parse(body);
            display("Name of the Venue", data[0].venue.name);
            display("Location of the Venue" , data[0].venue.city + "," + data[0].venue.region + "," + data[0].venue.country);
            var dateTime = data[0].datetime.split("T");
            display("Date", moment(dateTime[0]). format("MM/DD/YYYY"));
        }
      });
}



function findMovie(){
    var queryUrl = "http://www.omdbapi.com/?t=" + searchName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Movie info is: \n" , JSON.parse(body));
        var data = JSON.parse(body);
        var title = data.Title;
        var year = data.Year;
        var imdbRating = data.imdbRating;
        var rtRating = data.Ratings[1].Value;
        var country = data.Country;
        var language = data.Language;
        var plot = data.Plot;
        var actors = data.Actors;
        display("Title of the movie", title);
        display("Year the movie came out", year);
        display("IMDB Rating of the movie", imdbRating);
        display("Rotten Tomatoes Rating of the movie", rtRating);
        display("Country where the movie was produced", country);
        display("Language of the movie", language);
        display("Plot of the movie", plot);
        display("Actors in the movie", actors);
    }
});
}
function doRandom(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data (a single string)
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        if (dataArr.length == 2){
            action = dataArr[0];
            searchName =dataArr[1];
            toDo();
        }
      });
}
    
function display (header, content){
    console.log("=======================================");
    console.log("  "+header+"              ");
    console.log("  ~~~~~~~~~~~~~~~~~~~         ");
    console.log("  " + content);
}
function displayHd(header){
    console.log("=======================================");
    console.log("  "+header+"              ");
    console.log("  ~~~~~~~~~~~~~~~~~~~         ");
}
function displayCnt(content) {
    console.log("  " + content);
}

