var express = require('express');
var bodyParser = require('body-parser');
var Article = require(__dirname + '/../models/articles');

var articleRouter = module.exports = exports = express.Router();

articleRouter.get('/articles/:name', function(req, res) {
  Article.find({name: req.params.name}, function(err, data) {
    if(err) throw err;

    res.json(data);
  });
});

articleRouter.post('/articles', function(req, res) {
  var newArticle = new Article(req.body);

  newArticle.save(function(err, data) {
    if(err) throw err;

    res.json(data);
  });
});

articleRouter.delete('/articles/:id', function(req, res) {

  Article.remove({_id: req.params._id}, function(err, data) {
    if(err) throw err;

    res.send('Deleted ' + data.name + '.');
  });
});
