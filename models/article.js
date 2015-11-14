var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var collectionSchema = require(__dirname + '/collection.js').collectionSchema;

var articleSchema = module.exports.articleSchema = mongoose.Schema({
  title: String,
  sentiment: String,
  sentimentValue: Number,
  vPosTerms: [{word: String, count: Number}],
  posTerms: [{word: String, count: Number}],
  negTerms: [{word: String, count: Number}],
  vNegTerms: [{word: String, count: Number}],
  collections: [{type: Schema.Types.ObjectId, ref: 'Collection'}]
});

var Article = module.exports.Article = mongoose.model('Article', articleSchema);


//superagent http://localhost:3000/api/articles post '{"title":"Test Article", "wordcounts": [{"word":"apple", "count":5}, {"word": "banana", "count": 2}]}'
//{title:'lorum ipsum', wordcounts: [{word:'apple', count:5}, {word: 'banana', count: 2}]}
