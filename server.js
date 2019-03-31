
var express = require('express');
var app = express();
//app.use(express.json());

// 	let {PythonShell} = require('python-shell');
app.use(express.json());
var request = require("request");


// const options = {
//     mode: 'text',
//     pythonPath: 'C:/Python27/python.exe',
//     pythonOptions: ['-u'],
//     scriptPath: 'C:/Program Files (x86)/Cygwin/home/rwang/Safe_Village',
//   };
   var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



// PythonShell.run('model.py', null, function (err) {
//   if (err) throw err;
//   console.log('finished');
// });
// var result = null;
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.open("GET", "/tmp/guru99.txt", false);
//   xmlhttp.send();
//   if (xmlhttp.status==200) {
//   result = xmlhttp.responseText;
//   }

// var femaleModel = new Array(10);
// for(var i = 0; i < femaleModel.length; i++){
// 	femaleModel[i] = new Array(10);
// 	for(var j = 0; j < femaleModel[i].length; j++)
// 		femaleModel[i][j] = 0;
// }

  var allText  = "";
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", "alienwareapples.csv", true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      allText = rawFile.responseText;
    }
  }
  allText.substring(1, allText.length-1);
  var data = allText.split("\"\n\"");

//initialize 2D array for crime data with zeros
var crimeModel = new Array(100);
for(var i = 0; i < crimeModel.length; i++){
	crimeModel[i] = new Array(100);
	for(var j = 0; j < crimeModel[i].length; j++)
		crimeModel[i][j] = 0;
}

//update crimeModel, 2D array, with number of crime occurrences at each location
	for (i = 0; i < data.length; i++) {
		var loc = data[i];
		var div = loc.indexOf(",");

		var lat = parseFloat( loc.slice(1,div) );
		var long = parseFloat( loc.slice(div+1, loc.length-1 ));

		if ((lat >= 33.5 && lat <= 34.5) && (long <= -118 && long >= -119)) { //check in bounds
			var arrRow = round( abs(lat-33.5)*100.0 );
			var arrCol = round( abs(long+118)*100.0 );
			crimeModel[arrRow][arrCol]++; 
		}
	}






function calculateValue(sLat, sLong, dLat, dLong){
	var numTimes = Math.sqrt((sLat-dLat)*(sLat-dLat) + (sLong-dLong)*(sLong-dLong))/.001; //every .07 miles
	var total = 0;
	for(var i = 0; i < numTimes; i++){
		total += map[round( abs(sLat+i*(dLat-sLat)/numTimes-33.5)*100.0 )][round( abs(sLong+i*(dLong-sLong)/numTimes+118)*100.0 )];// MAPPPPPP TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
	}
	return total;
}

// app.post('/addData/')
function calculatePath(path){
	console.log(path);
	request({
  uri: path,
  method: "POST"
}, function(error, response, body){
      if (!error && response.statusCode == 200){
          console.log('message sent successfully');

          var ans = JSON.parse(body);
          var steps = ans.routes[0]['legs'][1]['steps'];
          var total = 0;
          for(var i = 0; i < steps.length; i++){
          		total += calculateValue(steps[i].start_location.lat, steps[i].start_location.long, steps[i].end_location.lat, steps[i].end_location.long);
          }

          return total;
      } else {
          console.log('error == ' + error);
          return -1;
      }
  });
	return 0;
}


app.post('/getSafeRoute', (req, res) =>{
	if(req.body.key == "apples"){
		console.log('req.body.startingLat;             ' + req.body.startingLat);
		var sLat = req.body.startingLat;
		var sLong = req.body.startingLong;
		var dLat = req.body.destinationLat;
		var dLong = req.body.destinationLong;

		var pathNameMin;
		var pathMin;
		var pathName;
		var pathValue;
		for(var i = 0; i < 4; i++){
			pathName = "https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyDHlFu8C9EcD_R88OuCkKdDKiKMWhbkwYI&mode=walking&origin="+sLat+
			","+sLong+"&destination="+dLat+","+dLong+"&waypoints="+(sLat+0.01*(i%2)*(i-2))+","+(sLong+0.01*((1+i)%2)*(i-1));
			pathValue = calculatePath(pathName);
			if(pathValue != -1 && (i == 0 || pathMin > pathValue)){
				pathNameMin = pathName;
				pathMin = pathValue;
			}
		}
		console.log("pathNameMinpathNameMinpathNameMinpathNameMinpathNameMinpathNameMin                  " + pathNameMin);
		res.send(pathNameMin);

	}
		res.send("bad request");
});

app.get('/hi', function(req, res){
	res.send("hi! i work :)");
});

app.listen(process.env.PORT || 5000, function (){
	console.log('Listening on port: ' + process.env.PORT);
});