var express = require('express');
var Twitter = require('twitter');
var sentimentChecker = require(__dirname + '/../lib/sentiment_checker.js');

var twitterRouter = module.exports = exports = express.Router();

var client = new Twitter({
  consumer_key: 'xxx',
  consumer_secret: 'xxx',
  access_token_key: 'xxx',
  access_token_secret: 'xxx'
});


twitterRouter.get('/twitter/timeline', function(req, res, next) {

  var params = {screen_name: "1redtulip", count: 200, trim_user: true};
  client.get('statuses/user_timeline.json', params, function(err, tweets, response) {
    if(err) throw err;
    res.tweets = '';
    for(var i = 0; i < tweets.length; i++) {
      res.tweets += tweets[i].text;
    }

    next();
  });
});

twitterRouter.get('/twitter/timeline', function(req, res) {
  res.tweetSentiment = (sentimentChecker(res.tweets));
  res.send(res.tweetSentiment);

});

twitterRouter.get('/twitter/hashtag', function(req, res, next) {
  var params = {q: "#prayforparis", count: 100};
  client.get('search/tweets.json', params, function(err, tweets, response) {
    if(err) throw err;

    res.tweets = '';
    for(var i = 0; i < tweets.statuses.length; i++) {
      res.tweets += tweets.statuses[i].text;
    }

    next();
  });
});

twitterRouter.get('/twitter/hashtag', function(req, res) {
  res.tweetSentiment = (sentimentChecker(res.tweets));
  res.send(res.tweetSentiment);

});


