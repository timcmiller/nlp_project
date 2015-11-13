var express = require('express');
var bodyParser = require('body-parser');
var Collection = require(__dirname + '/../models/collection').Collection;

var collectionRouter = module.exports = exports = express.Router();

collectionRouter.get('/collections/:title', function(req, res) {
  Collection.find({title: req.params.title}, function(err, data) {
    if(err) throw err;

    res.json(data);
  });
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
