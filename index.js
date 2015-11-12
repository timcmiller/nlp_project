var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAD_URI || 'mongodb://localhost/nlp_dev');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function(){
  console.log('server up!');
});
