var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var listSchema = require(__dirname + '/list.js').listSchema;
var articleSchema = require(__dirname + '/article.js').articleSchema;

var listEntrySchema = mongoose.Schema({
  list: {type: Schema.Types.ObjectId, ref: 'List'},
  article: {type: Schema.Types.ObjectId, ref: 'Article'}
});

var ListEntry = module.exports.ListEntry = mongoose.model('ListEntry', listEntrySchema);
