var fs = require('fs');
var lodash = require('lodash');
var stopWords = fs.readFileSync(__dirname + '/stopwords.js', 'utf-8');
var afinn = fs.readFileSync(__dirname + '/AFINN.json', 'utf-8');
var negationWords = require(__dirname + '/neg-words');
//add in different language lists here put them in a varible with the name of the language
afinn = JSON.parse(afinn);

var text = ('wow cool not');

var sentimentChecker = module.exports = function(text, language) {

  language = language || afinn;


  var sentences = function(text) {
    text = text.replace(/[$#%*"@'()\[\]{}:;_&\-]/g, '');
    return text.split(/[\.,!?]/g);
  };

  var returnValue = {};
  var tokens = sentences(text);
  var words = [];
  returnValue.vNegTerms = {};
  returnValue.negTerms = {};
  returnValue.posTerms = {};
  returnValue.vPosTerms = {};
  var sentimentWords = [];
  returnValue.sentimentValue = 0;
  returnValue.sentiment = '';


  for(var i = 0; i < tokens.length; i++) {
    tokens[i] = tokens[i].split(' ');
    lodash.remove(tokens[i], function(x) {
      return x === '';
    });
  }

  var j = 0;
  for(i = 0; i < tokens[j].length; i++) {
    tokens[j][i] = tokens[j][i].toLowerCase();
    if(lodash.contains(negationWords.neg, tokens[j][i])) {
      tokens[j][i] = -1;
    }
    if (tokens[j][i + 1] === undefined && tokens[j +1] !== undefined) {
      j++;
      i = -1;
    }
  }
  sentimentWords = tokens;
  var counter = 0;
  j = 0;
  for(i = 0; i < sentimentWords[j].length; i++) {
    if(language.hasOwnProperty(sentimentWords[j][i])) {

      counter++;

      if(lodash.contains(sentimentWords[j], -1)) {
        returnValue.sentimentValue += (language[sentimentWords[j][i]] * -1);

        if(language[sentimentWords[j][i]] === -5 || language[sentimentWords[j][i]] === -4) {
          if(returnValue.vPosTerms[sentimentWords[j][i]]) {
            returnValue.vPosTerms[sentimentWords[j][i]]++;
          }
          if(!returnValue.vNegTerms[sentimentWords[j][i]]) {
            returnValue.vPosTerms[('[NOT] ' + sentimentWords[j][i])] = 1;
          }
        }
        if(language[sentimentWords[j][i]] === -3 || language[sentimentWords[j][i]] === -2 || language[sentimentWords[j][i]] === -1) {
          if(returnValue.posTerms[sentimentWords[j][i]]) {
            returnValue.posTerms[sentimentWords[j][i]]++;
          }
          if(!returnValue.negTerms[sentimentWords[j][i]]) {
            returnValue.posTerms[('[NOT] ' + sentimentWords[j][i])] = 1;
          }
        }
        if(language[sentimentWords[j][i]] === 3 || language[sentimentWords[j][i]] === 2 || language[sentimentWords[j][i]] === 1) {
          if(returnValue.negTerms[sentimentWords[j][i]]) {
            returnValue.negTerms[sentimentWords[j][i]]++;
          }
          if(!returnValue.posTerms[sentimentWords[j][i]]) {
            returnValue.negTerms[('[NOT] ' + sentimentWords[j][i])] = 1;
          }
        }
        if(language[sentimentWords[j][i]] === 4 || language[sentimentWords[j][i]] === 5) {
          if(returnValue.vNegTerms[sentimentWords[j][i]]) {
            returnValue.vNegTerms[sentimentWords[j][i]]++;
          }
          if(!returnValue.vPosTerms[sentimentWords[j][i]]) {
            returnValue.vNegTerms[('[NOT] ' + sentimentWords[j][i])] = 1;
          }
        }

      } else {
        returnValue.sentimentValue += language[sentimentWords[j][i]];

        if(language[sentimentWords[j][i]] === -5 || language[sentimentWords[j][i]] === -4) {
          if(returnValue.vNegTerms[sentimentWords[j][i]]) {
            returnValue.vNegTerms[sentimentWords[j][i]]++;
          }
          if(!returnValue.vNegTerms[sentimentWords[j][i]]) {
            returnValue.vNegTerms[sentimentWords[j][i]] = 1;
          }
        }
        if(language[sentimentWords[j][i]] === -3 || language[sentimentWords[j][i]] === -2 || language[sentimentWords[j][i]] === -1) {
          if(returnValue.negTerms[sentimentWords[j][i]]) {
            returnValue.negTerms[sentimentWords[j][i]]++;
          }
          if(!returnValue.negTerms[sentimentWords[j][i]]) {
            returnValue.negTerms[sentimentWords[j][i]] = 1;
          }
        }
        if(language[sentimentWords[j][i]] === 3 || language[sentimentWords[j][i]] === 2 || language[sentimentWords[j][i]] === 1) {
          if(returnValue.posTerms[sentimentWords[j][i]]) {
            returnValue.posTerms[sentimentWords[j][i]]++;
          }
          if(!returnValue.posTerms[sentimentWords[j][i]]) {
            returnValue.posTerms[sentimentWords[j][i]] = 1;
          }
        }
        if(language[sentimentWords[j][i]] === 4 || language[sentimentWords[j][i]] === 5) {
          if(returnValue.vPosTerms[sentimentWords[j][i]]) {
            returnValue.vPosTerms[sentimentWords[j][i]]++;
          }
          if(!returnValue.vPosTerms[sentimentWords[j][i]]) {
            returnValue.vPosTerms[sentimentWords[j][i]] = 1;
          }
        }
      }
    }
    if (tokens[j][i + 1] === undefined && tokens[j +1] !== undefined) {
      j++;
      i = -1;
    }
  }

  returnValue.sentimentValue = returnValue.sentimentValue/counter;

  returnValue.sentimentValue = (Math.ceil(returnValue.sentimentValue * 10) / 10);

  if(returnValue.sentimentValue <= -4) {
    returnValue.sentiment = 'Very Negative';
  }
  if(returnValue.sentimentValue > -4 && returnValue.sentimentValue < -1) {
    returnValue.sentiment = 'Negative';
  }
  if(returnValue.sentimentValue >= -1 && returnValue.sentimentValue < 0) {
    returnValue.sentiment = 'Mildly Negative';
  }
  if(returnValue.sentimentValue === 0 || isNaN(returnValue.sentimentValue)) {
    returnValue.sentiment = 'Neutral';
  }
  if(returnValue.sentimentValue > 0 && returnValue.sentimentValue <= 1) {
    returnValue.sentiment = 'Mildly Positive';
  }
  if(returnValue.sentimentValue > 1 && returnValue.sentimentValue < 4) {
    returnValue.sentiment = 'Positive';
  }
  if(returnValue.sentimentValue >= 4) {
    returnValue.sentiment = 'Very Positive';
  }

  var sortArray = function(object) {
    var array = [];
    var reorderObject = {};
    for (var key in object) {
      array.push([key, object[key]]);
    }
    array.sort(function(a, b) {return b[1] - a[1];});

    for(var i = 0; i < array.length; i++) {
      reorderObject[array[i][0]] = array[i][1];
    }
    return reorderObject;
  };

  returnValue.vPosTerms = sortArray(returnValue.vPosTerms);
  returnValue.posTerms = sortArray(returnValue.posTerms);
  returnValue.negTerms = sortArray(returnValue.negTerms);
  returnValue.vNegTerms = sortArray(returnValue.vNegTerms);
  return returnValue;
};



