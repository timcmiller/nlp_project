var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var sentimentChecker = require(__dirname + '/../lib/sentiment/sentiment_checker.js');

var staticRouter = module.exports = exports = express.Router();

staticRouter.use('/public', express.static(path.resolve(__dirname + '/../public')));

staticRouter.get('/about-us', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../views/about-us.html'));
});

staticRouter.get('/lists', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../views/lists.html'));
});

staticRouter.get('/lists/:id', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../views/list.html'));
});

staticRouter.post('/process', bodyParser.urlencoded({extended: true}), function(req, res){
  var recievedText = (req.body.text);
  var returnJSON = (sentimentChecker(recievedText, req.body.language));
  res.json(returnJSON);
});

staticRouter.get('/fr', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../views/language-views/fr.html'));
});

staticRouter.get('/pt', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../views/language-views/pt.html'));
});

staticRouter.get('/sw', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../views/language-views/sw.html'));
});

staticRouter.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../views/index.html'));
});

staticRouter.get('*', function(req, res){
  res.status(404);
  res.sendFile(path.resolve(__dirname + '/../views/404.html'));
});

