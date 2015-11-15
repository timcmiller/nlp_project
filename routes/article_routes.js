var express = require('express');
var bodyParser = require('body-parser');
var Article = require(__dirname + '/../models/article').Article;

var articleRouter = module.exports = exports = express.Router();

articleRouter.get('/articles', function(req, res) {
  Article.find({}, function(err, data) {
    if(err) throw err;

    res.json(data);
  });
});

articleRouter.post('/articles', bodyParser.json(), function(req, res) {
  // Add this code to save articles with sentiment. urlencoded may be needed instead of bodyparser.json()
  // mapSentimentToArticle(recievedText).save(function(err, data) {
  //   if (err) throw err;
  //   console.log('Saved article!')
  // });
  var newArticle = new Article(req.body);
  newArticle.save(function(err, data) {
    if(err) throw err;
    res.json(data);
  });
});


articleRouter.get('/articles/:id', function(req, res) {
  Article.findOne({_id: req.params.id}, function(err, data) {
    if(err) throw err;
    res.json(data);
  });
});

articleRouter.delete('/articles/:id', function(req, res) {
  Article.remove({_id: req.params.id}, function(err, data) {
    if(err) throw err;
    res.json({msg: 'Article deleted!'});
  });
});
