var fs = require('fs');

var stopWords = fs.readFileSync(__dirname + '/languages/stopwords.js', 'utf-8');
var afinn = JSON.parse(fs.readFileSync(__dirname + '/languages/AFINN.json', 'utf-8'));
var enNegationWords = require(__dirname + '/languages/neg-words');

//add in different language lists here put them in a varible with the name of the language

var frStopWords = fs.readFileSync(__dirname + '/languages/fr-stop.js');
var frSentiment = JSON.parse(fs.readFileSync(__dirname + '/languages/fr-sentiment.json'));
var frNegationWrods = require(__dirname + '/languages/fr-neg.js');

var ptStopWords = fs.readFileSync(__dirname + '/languages/pt-stop.js');
var ptSentiment = JSON.parse(fs.readFileSync(__dirname + '/languages/pt-sentiment.json'));
var ptNegationWrods = require(__dirname + '/languages/pt-neg.js');

var swStopWords = fs.readFileSync(__dirname + '/languages/sw-stop.js');
var swSentiment = JSON.parse(fs.readFileSync(__dirname + '/languages/sw-sentiment.json'));
var swNegationWrods = require(__dirname + '/languages/sw-neg.js');

var languageChecker = module.exports = exports = function(language) {

  var returnObject = {};

  if(language === 'fr') {
    returnObject.negation = frNegationWrods;
    returnObject.language = frSentiment;
  } else if(language === 'pt') {
    returnObject.negation = ptNegationWrods;
    returnObject.language = ptSentiment;
  } else if(language === 'sw') {
    returnObject.negation = swNegationWrods;
    returnObject.language = swSentiment;
  } else {
    returnObject.negation = enNegationWords;
    returnObject.language = afinn;
  }

  return returnObject;
};
