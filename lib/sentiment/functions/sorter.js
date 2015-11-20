var lodash = require('lodash');

module.exports = exports = function(text, words) {
  var counter = 0;
  returnObject = {};
  returnObject.vNegTerms = {};
  returnObject.negTerms = {};
  returnObject.posTerms = {};
  returnObject.vPosTerms = {};
  returnObject.sentimentValue = 0;
  returnObject.sentiment = '';
  j = 0;

  for(i = 0; i < text[j].length; i++) {
    if(words.hasOwnProperty(text[j][i])) {

      counter++;

      if(lodash.contains(text[j], -1)) {
        returnObject.sentimentValue += (words[text[j][i]] * -1);

        if(words[text[j][i]] === -5 || words[text[j][i]] === -4) {
          if(returnObject.vPosTerms['[NOT] ' + text[j][i]]) {
            returnObject.vPosTerms['[NOT] ' + text[j][i]]++;
          }
          if(!returnObject.vNegTerms[text[j][i]] && !returnObject.vPosTerms['[NOT] ' + text[j][i]]) {
            returnObject.vPosTerms[('[NOT] ' + text[j][i])] = 1;
          }
        }
        if(words[text[j][i]] === -3 || words[text[j][i]] === -2 || words[text[j][i]] === -1) {
          if(returnObject.posTerms['[NOT] ' + text[j][i]]) {

            returnObject.posTerms['[NOT] ' + text[j][i]]++;
          }
          if(!returnObject.negTerms[text[j][i]] && !returnObject.posTerms['[NOT] ' + text[j][i]]) {
            returnObject.posTerms[('[NOT] ' + text[j][i])] = 1;
          }
        }
        if(words[text[j][i]] === 3 || words[text[j][i]] === 2 || words[text[j][i]] === 1) {
          if(returnObject.negTerms['[NOT] ' + text[j][i]]) {
            returnObject.negTerms['[NOT] ' + text[j][i]]++;
          }
          if(!returnObject.posTerms[text[j][i]] && !returnObject.negTerms['[NOT] ' + text[j][i]]) {
            returnObject.negTerms[('[NOT] ' + text[j][i])] = 1;
          }
        }
        if(words[text[j][i]] === 4 || words[text[j][i]] === 5) {
          if(returnObject.vNegTerms['[NOT] ' + text[j][i]]) {
            returnObject.vNegTerms['[NOT] ' + text[j][i]]++;
          }
          if(!returnObject.vPosTerms[text[j][i]] && !returnObject.vNegTerms['[NOT] ' + text[j][i]]) {
            returnObject.vNegTerms[('[NOT] ' + text[j][i])] = 1;
          }
        }

      } else {
        returnObject.sentimentValue += words[text[j][i]];

        if(words[text[j][i]] === -5 || words[text[j][i]] === -4) {
          if(returnObject.vNegTerms[text[j][i]]) {
            returnObject.vNegTerms[text[j][i]]++;
          }
          if(!returnObject.vNegTerms[text[j][i]]) {
            returnObject.vNegTerms[text[j][i]] = 1;
          }
        }
        if(words[text[j][i]] === -3 || words[text[j][i]] === -2 || words[text[j][i]] === -1) {
          if(returnObject.negTerms[text[j][i]]) {
            returnObject.negTerms[text[j][i]]++;
          }
          if(!returnObject.negTerms[text[j][i]]) {
            returnObject.negTerms[text[j][i]] = 1;
          }
        }
        if(words[text[j][i]] === 3 || words[text[j][i]] === 2 || words[text[j][i]] === 1) {
          if(returnObject.posTerms[text[j][i]]) {
            returnObject.posTerms[text[j][i]]++;
          }
          if(!returnObject.posTerms[text[j][i]]) {
            returnObject.posTerms[text[j][i]] = 1;
          }
        }
        if(words[text[j][i]] === 4 || words[text[j][i]] === 5) {
          if(returnObject.vPosTerms[text[j][i]]) {
            returnObject.vPosTerms[text[j][i]]++;
          }
          if(!returnObject.vPosTerms[text[j][i]]) {
            returnObject.vPosTerms[text[j][i]] = 1;
          }
        }
      }
    }
    if (text[j][i + 1] === undefined && text[j +1] !== undefined) {
      j++;
      i = -1;
    }
  }

  returnObject.sentimentValue = (Math.ceil((returnObject.sentimentValue/counter) * 100) / 100);

  return returnObject;
};
