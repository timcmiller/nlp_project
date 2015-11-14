var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = require(__dirname + '/article.js').articleSchema;

var listSchema = mongoose.Schema({
  title: String,
  //articles: [{type: Schema.Types.ObjectId, ref: 'Article'}]
});

var List = module.exports.List = mongoose.model('List', listSchema);
