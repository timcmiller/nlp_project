var mongoose = require('mongoose');

var articleSchema = module.exports.articleSchema = mongoose.Schema({
  title: String,
  wordcounts: [{
    word: String,
    count: Number
  }]
});

var Article = module.exports.Article = mongoose.model('Article', articleSchema);


//superagent http://localhost:3000/api/articles post '{"title":"Test Article", "wordcounts": [{"word":"apple", "count":5}, {"word": "banana", "count": 2}]}'
//{title:'lorum ipsum', 'wordcounts': [{word:'apple', count:5}, {word: 'banana', count: 2}]}
