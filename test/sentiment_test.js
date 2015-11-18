var chai = require('chai');
var expect = chai.expect;
var sentiment = require(__dirname + "/../lib/sentiment_checker.js");
var mapSentimentToArticle = require(__dirname + "/../lib/map_sentiment.js");
var mapArticleToSentiment = require(__dirname + "/../lib/reverse_map_sentiment.js");
var mongoose = require('mongoose');

process.env.MONGOLAB_URI = 'mongodb://localhost/nlp_test';

describe('sentiment analysis', function(){

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

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
  it('the sentiment mapper should take a sentiment object and map to Article schema', function(){
    var testString = 'abandon, disjointed';
    var returnArticle = mapSentimentToArticle(testString);
    expect(returnArticle).to.be.an('object');
    expect(returnArticle.title).to.eql('abandon, disjointed');
    expect(returnArticle.sentimentValue).to.eql(-2);
    expect(returnArticle).to.have.property('negTerms');
    expect(returnArticle).to.have.property('vNegTerms');
    expect(returnArticle).to.have.property('posTerms');
    expect(returnArticle).to.have.property('vPosTerms');
    expect(returnArticle.negTerms[0]).to.have.property('word');
    expect(returnArticle.negTerms[0]).to.have.property('count');
    expect(returnArticle.sentiment).to.eql('Mildly Negative');
  });
  it('the sentiment mapper should map a title parameter', function(){
    var testString = 'a test string';
    var returnArticle = mapSentimentToArticle(testString, 'my custom title');
    expect(returnArticle.title).to.eql('my custom title');
  });
  it('the reverse sentiment mapper should return a simplified object', function(){
      var testString = 'abandon, disjointed';
      var articleObj = mapSentimentToArticle(testString);
      var reversed = mapArticleToSentiment(articleObj);
      expect(reversed).to.be.an('object');
      expect(reversed.sentimentValue).to.eql(-2);
      expect(reversed).to.have.property('negTerms');
      expect(reversed).to.have.property('vNegTerms');
      expect(reversed).to.have.property('posTerms');
      expect(reversed).to.have.property('vPosTerms');
      expect(reversed.negTerms).to.have.property('abandon');
      expect(reversed.negTerms).to.have.property('disjointed');
      expect(reversed.sentiment).to.eql('Mildly Negative');
  })
});
