var chai = require('chai');
var expect = chai.expect;
var sentiment = require(__dirname + "/../lib/index.js");

describe('sentiment analysis', function(){
  it('should return objects of words with number scores', function(){
    var testString = 'abandon, disjointed';
    var returnObject = sentiment(testString);
    console.log(returnObject);
    expect(returnObject).to.be.an('object');
    expect(returnObject).to.eql(-2);
    expect(returnObject.disjointed).to.eql('disjointed' -2);
  });
  it('should return average score of sentiment words divided by total score', function() {
    var averageSentiment = 'abandon and disjointed';
    var returnObject = sentiment(averageSentiment);
    var returnAverage = sentiment(averageSentiment);
    console.log(typeof returnObject);
    expect(returnObject).to.be.an('object');
    expect(returnObject.averageSentiment).to.eql(-2);
  });
});
