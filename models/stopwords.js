var mongoose = require('mongoose');

var stopwordSchema = new mongoose.Schema({
  word: {type: String, require: true}
});

module.exports = exports = mongoose.model('Stopword', stopwordSchema);
