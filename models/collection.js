var mongoose = require('mongoose');
var articleSchema = require(__dirname + '/article.js').articleSchema;

var collectionSchema = mongoose.Schema({
  title: String,
  articles: [articleSchema]
});

var Collection = module.exports.Collection = mongoose.model('Collection', collectionSchema);
