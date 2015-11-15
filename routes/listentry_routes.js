var express = require('express');
var bodyParser = require('body-parser');
var List = require(__dirname + '/../models/list').List;
var Article = require(__dirname + '/../models/article').Article;
var ListEntry = require(__dirname + '/../models/listentry').ListEntry;
var listEntryRouter = module.exports = exports = express.Router();

listEntryRouter.get('/list-entries/:id', function(req, res) {
  ListEntry.find({_id: req.params.id}, function(err, listEntryData){
      if(err) throw err;
      res.json(listEntryData);
    })
});

listEntryRouter.get('/list-entries', function(req, res) {
  ListEntry.find({}, function(err, data) {
    if(err) throw err;
    res.json(data);
  });
});

listEntryRouter.post('/list-entries', bodyParser.json(), function(req, res) {
  var newListEntry = new ListEntry(req.body);
  Article.findByIdAndUpdate(newListEntry.article, {$push: {"lists": newListEntry.list}}, function(err, model){
    if (err) throw err;
  });
  List.findByIdAndUpdate(newListEntry.list, {$push: {"articles": newListEntry.article}}, function(err, model){
    if (err) throw err;
  });
  newListEntry.save(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

listEntryRouter.delete('/list-entries/:id', function(req, res) {
  ListEntry.remove({_id: req.params._id}, function(err, data) {
    if(err) throw err;
    res.send('Deleted ' + data.name + '.');
  });
});
