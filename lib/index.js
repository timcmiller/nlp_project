
var fs = require('fs');
var lodash = require('lodash');
var stopWords = fs.readFileSync(__dirname + '/stopwords.js', 'utf-8');
var afinn = fs.readFileSync(__dirname + '/AFINN.json', 'utf-8');
afinn = JSON.parse(afinn);


var text = 'There\'s a fire starting in my heart Reaching a fever pitch and it\'s bringing me out the dark Finally, I can see you crystal clear Go ahead and sell me out and I\'ll lay your shit bare See how I\'ll leave with every piece of you Don\'t underestimate the things that I will do There\'s a fire starting in my heart Reaching a fever pitch and its bringing me out the dark The scars of your love remind me of us They keep me thinking that we almost had it all The scars of your love, they leave me breathless I can\'t help feeling We could\'ve had it all (You\'re gonna wish you never had met me) Rolling in the deep (Tears are gonna fall, rolling in the deep) You had my heart inside of your hand (You\'re gonna wish you never had met me) And you played it to the beat (Tears are gonna fall, rolling in the deep) Baby, I have no story to be told But I\'ve heard one of you and I\'m gonna make your head burn Think of me in the depths of your despair Making a home down there, as mine sure won\'t be shared The scars of your love remind me of us (Tears are gonna fall, rolling in the deep) They keep me thinking that we almost had it all (You\'re gonna wish you never had met me) The scars of your love, they leave me breathless (Tears are gonna fall, rolling in the deep) I can\'t help feeling We could\'ve had it all (You\'re gonna wish you never had met me) Rolling in the deep (Tears are gonna fall, rolling in the deep) You had my heart inside of your hand (You\'re gonna wish you never had met me) And you played it to the beat (Tears are gonna fall, rolling in the deep) Could have had it all Rolling in the deep You had my heart inside of your hand But you played it with a beating Throw your soul through every open door Count your blessings to find what you look for Turn my sorrow into treasured gold You pay me back in kind and reap just what you sow We could\'ve had it all (Tears are gonna fall, rolling in the deep) We could\'ve had it all (You\'re gonna wish you never had met me) It all, it all, it all (Tears are gonna fall, rolling in the deep) We could\'ve had it all (You\'re gonna wish you never had met me) Rolling in the deep (Tears are gonna fall, rolling in the deep) You had my heart inside of your hand (You\'re gonna wish you never had met me) And you played it to the beat (Tears are gonna fall, rolling in the deep) Could\'ve had it all (You\'re gonna wish you never had met me) Rolling in the deep (Tears are gonna fall, rolling in the deep) You had my heart inside of your hand But you played it You played it You played it You played it to the beat'

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
console.log(returnValue.vNegTerms, returnValue.negTerms, returnValue.posTerms, returnValue.vPosTerms, returnValue.sentimentValue, returnValue.sentiment);


