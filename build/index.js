'use strict';

var analysis = require('../build/afinn.json');
var fs = require('fs');
var
//read afinn list

fs.readFile('/lib/afinn.json', function(err, data) {
  if(err) throw err;
});

fs.readFile('/lib/stockwords.json', function(err, data){
  if(err) throw err;
});


function makeTokens(rawData) {
  .replace(/[^a-zA-Z- ]+/g, '');
  .replace('/ {2,}/','');
  .toLowerCase():
  .split('');
}

//storage objects
  var tokens = makeTokens(phrase),
  score = 0,
  words = [],
  veryNegTerms = [],
  negTerms = [],
  posTerms = [],
  vPosTerms = [],

  //iterate over tokens

  var lengt````````````````````h = tokens.length;
  while (length < )

//load up text and format based on afinn values
//read user input/database calls here


//combine pos and neg results

//run naive bayes algorithm using 4 categories


afinnList

veryNegTerms =
negTerms =
posTerms =
vPosTerms =


results  = combine(posResult, negResult)
//run naive bayes algorithm using all 4 categories

Classifier = naiveBayes
