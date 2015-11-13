var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
require(__dirname + '/../index.js');

process.env.MONGOLAB_URI = 'mongodb://localhost/nlp_test';

var mongoose = require('mongoose');
var Article = require(__dirname + '/../models/article.js').Article;
var Collection = require(__dirname + '/../models/collection.js').Collection;

describe('our api routes', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  describe('the article routes', function() {

    it('should be able to create an article', function(done) {
      var testArticle = {title: 'lorum ipsum'};
      chai.request('localhost:3000')
        .post('/api/articles')
        .send(testArticle)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('_id');
          expect(res.body.title).to.eql('lorum ipsum');
          done();
      });
    });
    describe('tests that need something in the database', function() {

      beforeEach(function(done) {
        (new Article({title: 'lorum ipsum'}))
        .save(function(err, data) {
          expect(err).to.eql(null);
          this.article = data;
          done();
        }.bind(this));
      });
      it('should respond to a get request', function(done) {
        chai.request('localhost:3000')
          .get('/api/articles/' + this.article._id)
          .end(function(err, res) {
            debugger;
            expect(err).to.eql(null);
            expect(res.body).to.have.property('_id');
            expect(res.body.title).to.eql('lorum ipsum');
            done();
        }.bind(this));
      });

      it('should be able to delete a article', function(done) {
        chai.request('localhost:3000')
          .delete('/articles/' + this.article._id)
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.text).to.eql('Deleted ' + res.name + '.');
            done();
        });
      });
    });
  });

  describe('the collection routes', function() {

    it('should be able to create a collection', function(done) {
      var testCollection = {name: 'test'};
      chai.request('localhost:3000')
        .post('/api/collections')
        .send(testCollection)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('_id');
          expect(res.body.name).to.eql('test');
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
          .get('/collections')
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body)).to.eql(true);
            done();
        });
      });

      it('should be able to delete a collection', function() {
        chai.request('localhost:3000')
          .delete('/collections/' + this.collection._id)
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.text).to.eql('Deleted ' + res.name + '.');
        });
      });
    });

    describe('the route to collections that returns all articles in a collection', function() {
      beforeEach(function(done) {
        (new Collection({name: 'collection', article: (new Article({name: 'article'}))})).save(function(err, data) {
          expect(err).to.eql(null);
          this.collection = data;
        }.bind(this));
      });

      it('should respond with all the articles in this collection', function(done) {
        chai.request('localhost:3000')
          .get('/collections/' + this.collection.name)
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body)).to.eql(true);
            done();
        });
      });
    });
  });
});
