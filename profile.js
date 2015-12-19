
var http = require("http");
var https = require("https");

//Print out message
function PrintMessage(username, badgeCount, points) {
	var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
	console.log(message);
}

//Print out error messages
function printError(error){
	console.error(error.message);
}

function get(username){
	//Connect to the API URL (http://teamtreehouse.com/username.json)
	var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response){
		//Read the data
		var body = '';
		response.on('data', function(chunk){
			body += chunk
		});
		response.on('end', function(){
			if (response.statusCode === 200){
				//Parse the data
				try {
					var profile = JSON.parse(body);
					//Print the data
					PrintMessage(username, profile.badges.length, profile.points.JavaScript)
				} catch(error) {
				//Parse error
					printError(error);
				} 
			}
			else {
				//Status Code Error
				printError({message: "There was an error getting the profile for " + username + ". ("+http.STATUS_CODES[response.statusCode]+")"});
			}
		});
	});

	//Connection Error
	request.on('error', printError);
}

module.exports.get = get;