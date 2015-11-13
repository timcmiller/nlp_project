var mongoose = require('mongoose');
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var frequency = require(__dirname + '/lib/frequency');
var collectionRouter = require(__dirname + '/routes/collection_routes.js');
var articleRouter = require(__dirname + '/routes/article_routes.js');

app.use('/api', collectionRouter);
app.use('/api', articleRouter);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/process', bodyParser.urlencoded({extended: true}), function(req, res){
  var recievedText = (req.body.text);
  console.log(recievedText);
  var returnJSON = JSON.stringify(frequency(recievedText));
  res.send(returnJSON);
})

app.listen(3000, function(){
  console.log('server up!');
});
