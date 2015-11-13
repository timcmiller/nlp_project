var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/nlp_test';

var mongoose = require('mongoose');
require(__dirname + '/../index.js');

var Article = require(__dirname + '/../models/article.js').Article;
var Collection = require(__dirname + '/../models/collection.js').Collection;

describe('our api routes', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  describe('the article routes', function() {
    var currentArticle;

    it('should be able to create an article', function(done) {
      var testArticle = {title: 'lorum ipsum'};
      chai.request('localhost:3000')
        .post('/api/articles')
        .send(testArticle)
        .end(function(err, res) {
          expect(err).to.eql(null);
          currentArticle = res.body;
          expect(res.body).to.have.property('_id');
          expect(res.body.title).to.eql('lorum ipsum');
          done();
      });
    });

    it('should get all the articles with a GET request', function(done){
      chai.request('http://localhost:3000')
      .get('/api/articles')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });

    it('should get a single article with a GET request', function(done){
      chai.request('http://localhost:3000')
      .get('/api/articles/' + currentArticle._id)
      .end(function(err, res){
          expect(err).to.eql(null);
          expect(res.body[0].title).to.eql('lorum ipsum');
          done();
      });
    });

    describe('a test article', function() {

      beforeEach(function(done) {
        (new Article({title:'lorum ipsum', wordcounts: [{word:'apple', count:5}, {word: 'banana', count: 2}]}))
        .save(function(err, data) {
          expect(err).to.eql(null);
          this.article = data;
          done();
        }.bind(this));
      });

      it('should get the created article with a GET request', function(done){
        chai.request('http://localhost:3000')
        .get('/api/articles/' + this.article._id)
        .end(function(err, res){
            expect(err).to.eql(null);
            expect(res.body[0].title).to.eql('lorum ipsum');
            done();
        });
      });


      it('should be able to delete the created article', function(done) {
        chai.request('localhost:3000')
          .delete('/api/articles/' + this.article._id)
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('Article deleted!');
            done();
        });
      });
    });
  });

  describe('the collection routes', function() {

    it('should be able to create a collection', function(done) {
      var testCollection = {title: 'test'};
      chai.request('localhost:3000')
        .post('/api/collections')
        .send(testCollection)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('_id');
          expect(res.body.title).to.eql('test');
          //add any other properties it will have!
          done();
      });
    });
    describe('the collection routes that need data', function() {

      beforeEach(function(done) {
        (new Collection({name: 'test'})).save(function(err, data) {
          expect(err).to.eql(null);
          this.collection = data;
          done();
        }.bind(this));
      });

      it('should respond to a get request with all the collections', function(done) {
        chai.request('localhost:3000')
          .get('/api/collections')
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body)).to.eql(true);
            done();
        });
      });

      it('should be able to delete a collection', function() {
        chai.request('localhost:3000')
          .delete('/api/collections/' + this.collection._id)
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.text).to.eql('Deleted ' + res.title + '.');
        });
      });
    });

    describe('the route to collections that returns all articles in a collection', function(done) {
      beforeEach(function(done) {
        (new Collection({name: 'collection', article: (new Article({name: 'article'}))})).save(function(err, data) {
          expect(err).to.eql(null);
          this.collection = data;
          done();
        }.bind(this));
      });

      it('should respond with all the articles in this collection', function(done) {
        chai.request('localhost:3000')
          .get('/api/collections/' + this.collection.id)
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body)).to.eql(true);
            done();
        });
      });
    });
  });
});
