var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = require(__dirname + '/article.js').articleSchema;

var collectionSchema = mongoose.Schema({
  title: String,
  //articles: [{type: Schema.Types.ObjectId, ref: 'Article'}]
});

var Collection = module.exports.Collection = mongoose.model('Collection', collectionSchema);
