var express = require('express');
var bodyParser = require('body-parser');
var List = require(__dirname + '/../models/list').List;
var Article = require(__dirname + '/../models/article').Article;
var listRouter = module.exports = exports = express.Router();
var mapArticleToSentiment = require(__dirname + "/../lib/reverse_map_sentiment.js");

listRouter.get('/list-articles/:id', bodyParser.json(), function(req, res) {
  Article.find({lists: req.params.id}, null, {sort: {sentimentValue: -1}},function(err, articleData){
    var returnArray = [];
    for(var i = 0; i < articleData.length; i++){
      returnArray.push(mapArticleToSentiment(articleData[i]))
    }
      if(err) throw err;
      res.json(returnArray);
    })
});
listRouter.get('/lists/:id', bodyParser.json(), function(req, res) {
  List.findOne({_id: req.params.id}, function(err, listData){
      if(err) throw err;
      res.json(listData);
    })
});

listRouter.get('/lists', bodyParser.json(), function(req, res) {
  List.find({}, function(err, listData){
      if(err) throw err;
      res.json(listData);
    })
});
listRouter.post('/lists', bodyParser.json(), function(req, res) {
  var newList = new List(req.body);

  newList.save(function(err, data) {
    if (err) throw err;

    res.json(data);
  });
});

listRouter.delete('/lists/:id', function(req, res) {

  List.remove({_id: req.params._id}, function(err, data) {
    if(err) throw err;

    res.send('Deleted ' + data.name + '.');
  });
});
