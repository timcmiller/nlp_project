'use strict';

var fs = require('fs');
var afinn = require(__dirname + '/AFINN.json');
var stop = require(__dirname + '/stopwords.json');


var tokenized = function(text) {
  var cleanedText = text.replace(/[^\w\s]/gi, '').toLowerCase();
  return cleanedText.split(/\s+/);
};

var tokens = tokenized;
var words = [];
var vNegTerms = [];
var negTerms = [];
var posTerms = [];
var vPosTerms = [];
var sentimentWords = [];
var sentimentValue = 0;

for(var i = 0; tokens.length; i++);
  if(!stopWords.contains(tokens[i])) {
    sentimentWords.push(tokens[i])
  };

 for(var i = 0; sentimentWords.length; i++);
  if(afinn.contains(sentimentWords[i])) {
    sentimentValue += afinn[sentimentWords[i]];
    if(afinn[sentimentWords[i]] == -5 || -4 ) {
      vNegTerms.push();
    }
    if(afinn[sentimentWords[i]] == -3 || -2 || -1) {
      negTerms.push();
    }
    if(afinn[sentimentWords[i]] == 3 || 2 || 1) {
      posTerms.push();
    }
    if(afinn[sentimentWords[i]] == 4 || 5) {
      vPosTerms.push();
    }
  };
  console.log(vNegTerms[], negTerms[], posTerms[], vPosTerms[]);


