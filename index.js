var mongoose = require('mongoose');
var express = require('express');

var app = express();

app.use('/api', collectionRouter);
app.use('/api', articleRouter);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function(){
  console.log('server up!');
});
