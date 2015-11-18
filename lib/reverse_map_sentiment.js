var mapArticleToSentimentObj = module.exports = function(articleObj){
var toMap = {};
var tempObj = articleObj.toObject({ getters: true, virtuals: false });
 for (var termKey in tempObj){
  if (['vPosTerms', 'vNegTerms', 'posTerms', 'negTerms'].indexOf(termKey) > -1){
    if(tempObj[termKey].length === 0){
      toMap[termKey] = {};
    } else {
      var wordArray = tempObj[termKey];
      toMap[termKey] = {};
      for (var i = 0; i < wordArray.length; i++){
        toMap[termKey][wordArray[i].word] = wordArray[i].count;
      }
    }
  }
}
toMap.title = tempObj.title;
toMap.sentimentValue = tempObj.sentimentValue;
toMap.sentiment = tempObj.sentiment;
  return toMap;
};

