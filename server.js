
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

// var x = new Array(10);
// for(var i = 0; i < x.length; i++)
// 	x[i] = new Array(10);
// app.post('/addData/')



app.get('/hi', function(req, res){
	res.send("hi! i work :)");
});

app.listen(2000, function (){
	console.log('Listening on port: ' + 2000);
});