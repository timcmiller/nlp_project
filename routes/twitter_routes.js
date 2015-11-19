var express = require('express');
var Twitter = require('twitter');
var bodyParser = require('body-parser');
var sentimentChecker = require(__dirname + '/../lib/sentiment_checker.js');

var twitterRouter = module.exports = exports = express.Router();

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


twitterRouter.post('/twitter/timeline', bodyParser.urlencoded({extended: true}), function(req, res, next) {
  var params = {screen_name: req.body.text, count: 200};
  client.get('statuses/user_timeline.json', params, function(err, tweets, response) {
    if(err) throw err;
    res.tweets = '';
    for(var i = 0; i < tweets.length; i++) {
      res.tweets += tweets[i].text;
    }

    next();
  });
});

twitterRouter.post('/twitter/timeline', function(req, res) {
  res.tweetSentiment = (sentimentChecker(res.tweets));
  res.send(res.tweetSentiment);

});

twitterRouter.post('/twitter/hashtag', bodyParser.urlencoded({extended: true}), function(req, res, next) {
  var params = {q: req.body.text, count: 100};
  client.get('search/tweets.json', params, function(err, tweets, response) {
    if(err) throw err;
    res.tweets = '';
    for(var i = 0; i < tweets.statuses.length; i++) {
      res.tweets += tweets.statuses[i].text;
    }

    next();
  });
});

twitterRouter.post('/twitter/hashtag', function(req, res) {
  res.tweetSentiment = (sentimentChecker(res.tweets));
  res.send(res.tweetSentiment);

});


