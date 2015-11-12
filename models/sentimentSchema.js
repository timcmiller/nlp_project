var mongoose = require('mongoose');

var sentimentSchema = new mongoose.Schema({
  word: {type: String, required: true},
  value: {type: Number, min: -5, max: 5, require: true}
});

module.exports = mongoose.model('Sentiment', sentimentSchema);
