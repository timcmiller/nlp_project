var express = require('express');
var bodyParser = require('body-parser');
var Collection = require(__dirname + '/../models/collection').Collection;
var Article = require(__dirname + '/../models/article').Article;
var collectionRouter = module.exports = exports = express.Router();

collectionRouter.get('/collections/:id', function(req, res) {
  Article.find({collections: req.params.id}, function(err, articleData){
      if(err) throw err;
      res.json(articleData);
    })
});

collectionRouter.get('/collections', function(req, res) {
  Collection.find({}, function(err, data) {
    if(err) throw err;

    res.json(data);
  });
});

collectionRouter.post('/collections', bodyParser.json(), function(req, res) {
  var newCollection = new Collection(req.body);

  newCollection.save(function(err, data) {
    if (err) throw err;

    res.json(data);
  });
});

collectionRouter.delete('/collections/:id', function(req, res) {

  Collection.remove({_id: req.params._id}, function(err, data) {
    if(err) throw err;

    res.send('Deleted ' + data.name + '.');
  });
});
