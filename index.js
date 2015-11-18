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
Article.find({}, function(err, data){
  if(data.length < 5) {require(__dirname + '/lib/population.js');}
});


mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/nlp_database');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/api', listRouter);
app.use('/api', articleRouter);
app.use('/api', listEntryRouter);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/about-us', function(req, res){
  res.sendFile(__dirname + '/views/about-us.html');
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/lists', function(req, res){
  res.sendFile(__dirname + '/views/lists.html');
});

app.get('/lists/:id', function(req, res){
  res.sendFile(__dirname + '/views/list.html');
});

app.post('/process', bodyParser.urlencoded({extended: true}), function(req, res){
  var recievedText = (req.body.text);
  var returnJSON = (sentimentChecker(recievedText));
  res.json(returnJSON);
});

app.listen(3000, function(){
  console.log('server up!');
});
