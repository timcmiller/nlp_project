var express = require('express');
var bodyParser = require('body-parser');
var Twitter = require('twitter');

var twitterRouter = module.exports = exports = express.Router();

var client = new Twitter({
  consumer_key: 'pH6RVt8KgRe7n13KT1TIT1vZY',
  consumer_secret: 'BHIcBqmNgycc48FR0T9SU1BcqSkyulqHfBenion6MFHvHMu9Qq',
  access_token_key: '84232321-z46I97AYAj2E168YmqJ4hUVHFkc93hcFSTqf6coeG',
  access_token_secret: '2kKJx1t7rvN5ecmvqFSNZLLQuSnykUPfyNWbfOIKUIStq'
});


twitterRouter.get('/twitter', function(req, res, next) {
  debugger;
  var params = {sreen_name: "TimCMiller"};
  client.get('statuses/user_timeline.json', params, function(err, tweets, response) {
    if(err) throw err;
    res.response = '';
    tweets += res.response;
    res.response = JSON.parse(res.response);
    debugger;
    next();
  });
});

twitterRouter.get('/twitter', function(req, res) {
  debugger;
  res.json(res.tweets);

});


