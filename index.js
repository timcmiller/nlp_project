var mongoose = require('mongoose');
var express = require('express');

var app = express();
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var frequency = require(__dirname + '/lib/frequency');
var sentimentChecker = require(__dirname + '/lib/sentiment_checker.js');
var mapSentimentToArticle = require(__dirname + '/lib/map_sentiment.js');
var listRouter = require(__dirname + '/routes/list_routes.js');
var listEntryRouter = require(__dirname + '/routes/listentry_routes.js');
var articleRouter = require(__dirname + '/routes/article_routes.js');
var Article = require(__dirname + '/models/article').Article;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/nlp_database');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/api', listRouter);
app.use('/api', articleRouter);
app.use('/api', listEntryRouter);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/process', bodyParser.urlencoded({extended: true}), function(req, res){
  var recievedText = (req.body.text);
  var returnJSON = (sentimentChecker(recievedText));
  res.json(returnJSON);
});

app.listen(3000, function(){
  console.log('server up!');
});
