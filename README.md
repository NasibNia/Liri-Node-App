<!-- Put the name of the project after the # -->
<!-- the # means h1  -->
# Liri Node App!

<!-- Put a description of what the project is -->

This fun project is my official introuduction to the beautiful world of node.js, the powerful package that enables us to run javascript outside of browsers. The application has capability of searching songs through spotify API, movies through OMDB API, and concerts through Bandsintown API. There are couple of modules that are required for the app to function properly. All of these dependecies are listed at the begining of the code using the keyword 'require' and  would need to be installed if are not provided under the name "node_modules"

To ask Liri for a specific task, user would need to provide the right command in the terminal. 
For instance, proper command for searching a song named "nothing else matters" would be:
node spotify-this-song nothing else matters

proper command for searching a movie named "mean girls" would be:
node movie-this mean girls

proper command for searching a concert from "katy perry" would be:
node concert-this katy perry

Also, there is a command as shown bellow, that goes through a file 

Liri would take the search name and will send the search name to the appropriate searchh channel, depending on the requested action. If the provided name includes more than one word, the code concatenates them into a api-searchable  format.

Finally it will get back to the user by providing the results search the console.


# Link to deployed site
<!-- make a link to the deployed site --> 
<!-- [What the user will see](the link to the deployed site) -->

[Liri Node Application]
This program is not deployed and is run on the console.


# Images
<!-- take a picture of the image and add it into the readme  -->
<!-- ![image title](path or link to image) -->
![wire frame](https://www.pexels.com/photo/white-laptop-computer-on-white-desk-1329068/)



# technology used
<!-- make a list of technology used -->
<!-- what you used for this web app, like html css -->

<!-- 
1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item. 
-->
- jquery
- javascript
- node.js
- API calls
- promise functions
- call backs
- error handling



# code snippets
<!-- put snippets of code inside ``` ``` so it will look like code -->
<!-- if you want to put blockquotes use a > -->

This block of the code shows the process of collecting inputs from the user and providing appropriate logic channels based on the validation analysis of those input as the following:

1) If neither action nor the search item is provided by the user, Liri will provide the list of actions to the user and also asks to enter a search item later on.
2) If the action is provided, Liri checks to see if it is among the acceptable ones; if so and if the asked request is other than "do-what-it-says" Liri asks user to enter a search item and then calls for the search
3)If both action and search item are provided and action is in the acceptable list, then Liri calls for the appropriate channel of search.

```

function getInput (){
    
    var data =  process.argv;
    for(var i = 2 ; i < data.length ; i++) {
        newLog = newLog + " " + data[i];
    } 
    updateLog(newLog);

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


```


# Learning points
<!-- Learning points where you would write what you thought was helpful -->
- jquery
- javascript
- node.js
- API calls
- promise functions
- call backs
- error handling




# Author 
<!-- make a link to the deployed site and have your name as the link -->
Nasibeh Nourbakhshnia
(www.linkedin.com/in/nasibehnourbakhshnia)

# License