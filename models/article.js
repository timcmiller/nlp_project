var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var listSchema = require(__dirname + '/list.js').listSchema;

var articleSchema = module.exports.articleSchema = mongoose.Schema({
  title: String,
  sentiment: String,
  sentimentValue: Number,
  vPosTerms: [{word: String, count: Number}],
  posTerms: [{word: String, count: Number}],
  negTerms: [{word: String, count: Number}],
  vNegTerms: [{word: String, count: Number}],
  lists: [{type: Schema.Types.ObjectId, ref: 'List'}]
});

var Article = module.exports.Article = mongoose.model('Article', articleSchema);
