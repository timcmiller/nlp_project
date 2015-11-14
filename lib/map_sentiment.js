var mongoose = require('mongoose');
var Article = require(__dirname + '/../models/article').Article;
var sentimentChecker = require(__dirname + '/sentiment_checker.js');

var mapSentimentToArticle = module.exports = function(textToMap, articleTitle) {
  var sentimentObj = sentimentChecker(textToMap);
  var mappedObj = {};
  var mappedArray = [];
    for (var termKey in sentimentObj){
      if (['vPosTerms', 'vNegTerms', 'posTerms', 'negTerms'].indexOf(termKey) > -1){
        mappedObj[termKey] = [];
        var i = 0;
        for (var wordCountKey in sentimentObj[termKey]){
          mappedArray[i] = {};
          mappedArray[i].word = wordCountKey;
          mappedArray[i].count = sentimentObj[termKey][wordCountKey];
          mappedObj[termKey].push(mappedArray[i])
          i++;
        }
      }
    }
  var newArticle = new Article({
    title: articleTitle || textToMap.slice(0,100),
    sentiment: sentimentObj.sentiment,
    sentimentValue: sentimentObj.sentimentValue,
    vPosTerms: mappedObj.vPosTerms,
    posTerms: mappedObj.posTerms,
    negTerms: mappedObj.negTerms,
    vNegTerms: mappedObj.vNegTerms,
    collections: []
  });
  return newArticle;
}
