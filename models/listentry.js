var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var listSchema = require(__dirname + '/list.js').listSchema;
var articleSchema = require(__dirname + '/article.js').articleSchema;

//When creating a new list entry with a post request it updates both the "articles" array in the List model as well as the "lists" array in the Articles model. Deleting removes from both as well.

var listEntrySchema = mongoose.Schema({
  list: {type: Schema.Types.ObjectId, ref: 'List'},
  article: {type: Schema.Types.ObjectId, ref: 'Article'}
});

var ListEntry = module.exports.ListEntry = mongoose.model('ListEntry', listEntrySchema);
