var express = require('express');
var bodyParser = require('body-parser');
var List = require(__dirname + '/../models/list').List;
var Article = require(__dirname + '/../models/article').Article;
var ListEntry = require(__dirname + '/../models/listentry').ListEntry;
var eatAuth = require(__dirname + '/../lib/eat_auth.js');
var listEntryRouter = module.exports = exports = express.Router();

//Currently no need for list entry GET or PUT requests.

listEntryRouter.post('/list-entries', eatAuth, bodyParser.json(), function(req, res) {
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

listEntryRouter.delete('/list-entries/:id', eatAuth,
 function(req, res) {
  ListEntry.findOne({_id: req.params.id}, function(err, doc){
  Article.update({_id: doc.article}, {$pull: {lists: doc.list}}, function(err, model){
    if (err) throw err;
  });
  List.update({_id: doc.list}, {$pull: {articles: doc.article}}, function(err, model){
    if (err) throw err;
    ListEntry.remove({_id: req.params.id}, function(err, data) {
    if(err) throw err;

    res.send('Deleted list entry.');
  });
    });
  });


});
