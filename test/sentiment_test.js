var chai = require('chai');
var expect = chai.expect;
var sentiment = require(__dirname + "/../lib/index.js");

describe('sentiment analysis', function(){
  it('should return number scores of negative or positive', function(){
    var negTestString = 'abandon disjointed frustrating mindless';
    debugger;
    var returnObject = sentiment(negTestString);
    console.log(typeof returnObject);
    expect(returnObject).to.be.an('object');
    expect(returnObject).to.eql(-8);
  });
});
