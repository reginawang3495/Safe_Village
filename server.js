
var express = require('express');
var app = express();

let {PythonShell} = require('python-shell');
// const options = {
//     mode: 'text',
//     pythonPath: 'C:/Python27/python.exe',
//     pythonOptions: ['-u'],
//     scriptPath: 'C:/Program Files (x86)/Cygwin/home/rwang/Safe_Village',
//   };
//  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



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

var femaleModel = new Array(10);
for(var i = 0; i < femaleModel.length; i++){
	femaleModel[i] = new Array(10);
	for(var j = 0; j < femaleModel[i].length; j++)
		femaleModel[i][j] = 0;
}
// app.post('/addData/')

app.post('/addData', function(req, res){
	if(req.body.key == "apples"){
		femaleModel[req.body.long][req.body.lat] += req.body.value;
		res.send(req.body);

	}
});

app.get('/hi', function(req, res){
	res.send("hi! i work :)");
});

app.listen(process.env.PORT || 5000, function (){
	console.log('Listening on port: ' + process.env.PORT);
});