var mongoose = require('mongoose');
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var frequency = require(__dirname + '/lib/frequency');
var sentimentChecker = require(__dirname + '/lib/sentiment_checker.js');
var mapSentimentToArticle = require(__dirname + '/lib/map_sentiment.js');
var listRouter = require(__dirname + '/routes/list_routes.js');
var articleRouter = require(__dirname + '/routes/article_routes.js');
var Article = require(__dirname + '/models/article').Article;
var twitterRouter = require(__dirname + '/routes/twitter_routes.js');
var Twitter = require('twitter');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/nlp_database');

app.use('/api', listRouter);
app.use('/api', articleRouter);
// app.use(twitterRouter);

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

var client = new Twitter({
  consumer_key: 'default',
  consumer_secret: 'default',
  access_token_key: 'default',
  access_token_secret: 'default'
});


app.get('/twitter', function(req, res, next) {

  var params = {screen_name: "axelthetoller", count: 200, trim_user: true};
  client.get('statuses/user_timeline.json', params, function(err, tweets, response) {
    if(err) throw err;
    res.tweets = '';
    for(var i = 0; i < tweets.length; i++) {
      res.tweets += tweets[i].text;
    }

    next();
  });
});

app.get('/twitter', function(req, res) {
  res.tweetSentiment = (sentimentChecker(res.tweets));
  res.send(res.tweetSentiment);

});

