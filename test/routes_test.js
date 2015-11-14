var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/nlp_test';

var mongoose = require('mongoose');
require(__dirname + '/../index.js');

var Article = require(__dirname + '/../models/article.js').Article;
var List = require(__dirname + '/../models/list.js').List;

describe('our api routes', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  describe('the article routes', function() {
    var currentArticle;

    it('should be able to create an article', function(done) {
      chai.request('localhost:3000')
        .post('/api/articles')
        .send({title: 'lorum ipsum'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          currentArticle = res.body;
          expect(res.body).to.have.property('_id');
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

  describe('the list routes', function() {

    it('should be able to create a list', function(done) {
      var testList = {title: 'test'};
      chai.request('localhost:3000')
        .post('/api/lists')
        .send(testList)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('_id');
          expect(res.body.title).to.eql('test');
          //add any other properties it will have!
          done();
      });
    });
    describe('the list routes that need data', function() {

      beforeEach(function(done) {
        (new List({name: 'test'})).save(function(err, data) {
          expect(err).to.eql(null);
          this.list = data;
          done();
        }.bind(this));
      });

      it('should respond to a get request with all the lists', function(done) {
        chai.request('localhost:3000')
          .get('/api/lists')
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body)).to.eql(true);
            done();
        });
      });

      it('should be able to delete a list', function() {
        chai.request('localhost:3000')
          .delete('/api/lists/' + this.list._id)
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.text).to.eql('Deleted ' + res.title + '.');
        });
      });
    });

    describe('the route to lists that returns all articles in a list', function(done) {
      beforeEach(function(done) {
        (new List({name: 'list', article: (new Article({name: 'article'}))})).save(function(err, data) {
          expect(err).to.eql(null);
          this.list = data;
          done();
        }.bind(this));
      });

      it('should respond with all the articles in this list', function(done) {
        chai.request('localhost:3000')
          .get('/api/lists/' + this.list.id)
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body)).to.eql(true);
            done();
        });
      });
    });
  });
});
