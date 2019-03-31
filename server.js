
var express = require('express');
var app = express();

let {PythonShell} = require('python-shell');
const options = {
    mode: 'text',
    pythonPath: 'C:/Python27/python.exe',
    pythonOptions: ['-u'],
    scriptPath: 'C:/Program Files (x86)/Cygwin/home/rwang/Safe_Village',
  };


PythonShell.run('model.py', options, function (err) {
  if (err) throw err;
  console.log('finished');
});
var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/tmp/guru99.txt", false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }

// var x = new Array(10);
// for(var i = 0; i < x.length; i++)
// 	x[i] = new Array(10);
// app.post('/addData/')

app.get('/yo', function(req, res){
PythonShell.run('model.py', options, function (err) {
  if (err) throw err;
  console.log('finished');
});
var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/tmp/guru99.txt", false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  	res.send(result);
});

app.get('/hi', function(req, res){
	res.send("hi! i work :)");
});

app.listen(2000, function (){
	console.log('Listening on port: ' + 2000);
});