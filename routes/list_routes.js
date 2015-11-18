var express = require('express');
var bodyParser = require('body-parser');
var List = require(__dirname + '/../models/list').List;
var Article = require(__dirname + '/../models/article').Article;
var eatAuth = require(__dirname + '/../lib/eat_auth.js');
var listRouter = module.exports = exports = express.Router();

listRouter.get('/lists/:id', function(req, res) {
  Article.find({lists: req.params.id}, function(err, articleData){
      if(err) throw err;
      res.json(articleData);
    });
});

listRouter.get('/lists', function(req, res) {
  List.find({}, function(err, data) {
    if(err) throw err;

    res.json(data);
  });
});

listRouter.post('/lists', eatAuth, bodyParser.json(), function(req, res) {
  var newList = new List(req.body);

  newList.save(function(err, data) {
    if (err) throw err;

    res.json(data);
  });
});

listRouter.delete('/lists/:id', eatAuth, function(req, res) {

  List.remove({_id: req.params._id}, function(err, data) {
    if(err) throw err;

    res.send('Deleted ' + data.name + '.');
  });
});
