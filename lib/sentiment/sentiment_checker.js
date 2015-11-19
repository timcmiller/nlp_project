var lodash = require('lodash');
var languageChecker = require(__dirname + '/functions/language_checker.js');
var sentences = require(__dirname + '/functions/sentence.js');
var negChecker = require(__dirname + '/functions/neg_checker.js');
var sorter = require(__dirname + '/functions/sorter.js');
var sentiment = require(__dirname + '/functions/sentiment.js');
var sortArray = require(__dirname + '/functions/sort_array.js');



var sentimentChecker = module.exports = function(text, language) {

  var words = languageChecker(language);

  text = sentences(text);

  for(var i = 0; i < text.length; i++) {
    text[i] = text[i].replace(/[\r\n?|\n]/g, ' ');
    text[i] = text[i].split(' ');
    lodash.remove(text[i], function(x) {
      return x === '';
    });
  }

  text = negChecker(text, words.negation.neg);

  returnValue = sorter(text, words.language);

  returnValue.sentiment = sentiment(returnValue.sentimentValue, language);

  returnValue.vPosTerms = sortArray(returnValue.vPosTerms);
  returnValue.posTerms = sortArray(returnValue.posTerms);
  returnValue.negTerms = sortArray(returnValue.negTerms);
  returnValue.vNegTerms = sortArray(returnValue.vNegTerms);

  return returnValue;
};
