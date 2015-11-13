var fs = require('fs');
var lodash = require('lodash');
var stopWords = fs.readFileSync(__dirname + '/stopwords.js', 'utf-8');
var afinn = fs.readFileSync(__dirname + '/AFINN.json', 'utf-8');
afinn = JSON.parse(afinn);


var text = 'all the presidential candidates seemed boring and left me feeling ambivalent and annoyed';


var sentimentChecker = module.exports = function(text) {
  var tokenized = function(text) {
    var cleanedText = text.replace(/[^\w\s]/gi, '').toLowerCase();
    return cleanedText.split(/\s+/);
  };
  var returnValue = {};
  var tokens = tokenized(text);
  var words = [];
  returnValue.vNegTerms = {};
  returnValue.negTerms = {};
  returnValue.posTerms = {};
  returnValue.vPosTerms = {};
  var sentimentWords = [];
  returnValue.sentimentValue = 0;
  returnValue.sentiment = '';


  var tokenized = function(text) {
    var cleanedText = text.replace(/[^\w\s]/gi, '').toLowerCase();
    return cleanedText.split(/\s+/);
  };

  for(var i = 0; i < tokens.length; i++) {
    if(!lodash.contains(stopWords, tokens[i])) {
      sentimentWords.push(tokens[i]);
    }
  }

  var counter = 0;
  for(var i = 0; i < sentimentWords.length; i++) {

    if(afinn.hasOwnProperty(sentimentWords[i])) {
      returnValue.sentimentValue += afinn[sentimentWords[i]];
      counter++;

      if(afinn[sentimentWords[i]] === -5 || afinn[sentimentWords[i]] === -4) {
        if(returnValue.vNegTerms[sentimentWords[i]]) {
          returnValue.vNegTerms[sentimentWords[i]]++;
        }
        if(!returnValue.vNegTerms[sentimentWords[i]]) {
          returnValue.vNegTerms[sentimentWords[i]] = 1;
        }
      }
      if(afinn[sentimentWords[i]] === -3 || afinn[sentimentWords[i]] === -2 || afinn[sentimentWords[i]] === -1) {
        if(returnValue.negTerms[sentimentWords[i]]) {
          returnValue.negTerms[sentimentWords[i]]++;
        }
        if(!returnValue.negTerms[sentimentWords[i]]) {
          returnValue.negTerms[sentimentWords[i]] = 1;
        }
      }
      if(afinn[sentimentWords[i]] === 3 || afinn[sentimentWords[i]] === 2 || afinn[sentimentWords[i]] === 1) {
        if(returnValue.posTerms[sentimentWords[i]]) {
          returnValue.posTerms[sentimentWords[i]]++;
        }
        if(!returnValue.posTerms[sentimentWords[i]]) {
          returnValue.posTerms[sentimentWords[i]] = 1;
        }
      }
      if(afinn[sentimentWords[i]] === 4 || afinn[sentimentWords[i]] === 5) {
        if(returnValue.vPosTerms[sentimentWords[i]]) {
          returnValue.vPosTerms[sentimentWords[i]]++;
        }
        if(!returnValue.vPosTerms[sentimentWords[i]]) {
          returnValue.vPosTerms[sentimentWords[i]] = 1;
        }
      }
    }
  }

  returnValue.sentimentValue = returnValue.sentimentValue/counter;

  if(returnValue.sentimentValue <= -4) {
    returnValue.sentiment = 'Very Negative';
  }
  if(returnValue.sentimentValue > -4 && returnValue.sentimentValue < 0) {
    returnValue.sentiment = 'Mildly Negative';
  }
  if(returnValue.sentimentValue === 0) {
    returnValue.sentiment = 'Neutral';
  }
  if(returnValue.sentimentValue > 0 && returnValue.sentimentValue < 4) {
    returnValue.sentiment = 'Mildly Positive';
  }
  if(returnValue.sentimentValue >= 4) {
    returnValue.sentiment = 'Very Positive';
  }
  return returnValue;
};

var returnValue = sentimentChecker(text);


