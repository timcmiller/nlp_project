var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var listSchema = require(__dirname + '/list.js').listSchema;
var articleSchema = require(__dirname + '/article.js').articleSchema;
var Article = require(__dirname + '/article.js').Article;
var List = require(__dirname + '/list.js').List;
//When creating a new list entry with a post request it updates both the "articles" array in the List model as well as the "lists" array in the Articles model. Deleting removes from both as well.

var listEntrySchema = mongoose.Schema({
  list: {type: Schema.Types.ObjectId, ref: 'List'},
  article: {type: Schema.Types.ObjectId, ref: 'Article'}
});

var ListEntry = module.exports.ListEntry = mongoose.model('ListEntry', listEntrySchema);
var updateListandArticle = module.exports.updateListAndArticle = function(entry){
  //if (addOrRemove === 'add' || addOrRemove === undefined){
    Article.findByIdAndUpdate(entry.article, {$push: {"lists": entry.list}}, function(err, model){
      if (err) throw err;
    });
    List.findByIdAndUpdate(entry.list, {$push: {"articles": entry.article}}, function(err, model){
      if (err) throw err;
    });
 // }
  //TODO: Implement this.
  //  else if (addOrRemove === 'remove'){
  //   Article.update({_id: doc.article}, {$pull: {lists: entry.list}}, function(err, entry){
  //     if (err) throw err;
  //   });
  //   List.update({_id: doc.list}, {$pull: {articles: entry.article}}, function(err, entry){
  //     if (err) throw err;
  //   });
  // }
}
