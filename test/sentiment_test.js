var chai = require('chai');
var expect = chai.expect;
var sentiment = require(__dirname + "/../lib/index.js");

describe('sentiment analysis', function(){
  it('should take string input and return sentiment levels', function() {
    var testString = 'abandon, disjointed';
    var returnObject = sentiment(testString);
    expect(returnObject).to.be.an('object');
    expect(returnObject.sentimentValue).to.eql(-2);
    expect(returnObject).to.have.property('negTerms');
    expect(returnObject).to.have.property('vNegTerms');
    expect(returnObject).to.have.property('posTerms');
    expect(returnObject).to.have.property('vPosTerms');
    expect(returnObject.sentiment).to.eql('Mildly Negative');
  });
});
