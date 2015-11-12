var express = require('express');
var bodyParser = require('body-parser');
var Collection = require(__dirname + '/../models/collections');

var collectionRouter = module.exports = exports = express.Router();

collectionRouter.get('/collection/:name', function(req, res) {
  Collection.find({name: req.params.name}, function(err, data) {
    if(err) throw err;

    res.json(data);
  });
});

collectionRouter.get('/collection', function(req, res) {
  Collection.find({}, function(err, data) {
    if(err) throw err;

    res.json(data);
  });
});

collectionRouter.post('/collection', bodyParser.json(), function(req, res) {
  var newCollection = new Collection(req.body);

  newCollection.save(function(err, data) {
    if (err) throw err;

    res.json(data);
  });
});

collectionRouter.delete('/article/:id', function(req, res) {

  Collection.remove({_id: req.params._id}, function(err, data) {
    if(err) throw err;

    res.send('Deleted ' + data.name + '.');
  });
});
