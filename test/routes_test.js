var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/nlp_test';

var mongoose = require('mongoose');
require(__dirname + '/../index.js');

var Article = require(__dirname + '/../models/article.js').Article;
var List = require(__dirname + '/../models/list.js').List;
var ListEntry = require(__dirname + '/../models/listentry.js').ListEntry;

describe('our api routes', function() {
  var currentArticle;
  var currentList;

  this.timeout(5000);

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  describe('the article routes', function() {

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
        expect(res.body.title).to.eql('lorum ipsum');
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
          expect(res.body.title).to.eql('lorum ipsum');
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

describe('the twitter routes', function() {

  it('should return sentiment anaylasis of a timelines tweets', function(done) {
    chai.request('localhost:3000')
      .post('/api/twitter/timeline')
      .send({text: 'twitter'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.an('object');
        done();
      });

  });

  it('twitter search api should return an object', function(done) {
    chai.request('localhost:3000')
      .post('/api/twitter/hashtags')
      .send({text: 'twitter'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.an('object');
        done();
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
      currentList = res.body;
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

describe('the list-entry routes', function(){
    //This will use an article and a list created in the above tests.
    it('should be able to create a list entry with a POST request', function(done){
      chai.request('localhost:3000')
      .post('/api/list-entries')
      .send({list: currentList._id, article: currentArticle._id})
      .end(function(err, res){
        expect(err).to.eql(null);
        var arrayOfListsInArticle;
        //Expect statements below to ensure that articles and lists are updated below
        Article.findOne({_id: currentArticle._id}, 'lists', function(err, article){
          if (err) throw err;
          expect(article.lists).to.include(currentList._id);
          List.findOne({_id: currentList._id}, 'articles', function(err, list){
            if (err) throw err;
            expect(list.articles).to.include(currentArticle._id);
            done();
          });
        });
        expect(res.body).to.have.property('_id');
      });
    });

    describe('a created list-entry', function(){
      beforeEach(function(done){
        (new ListEntry({list: currentList._id, article: currentArticle._id})).save(function(err, data){
          expect(err).to.eql(null);
          this.listEntry = data;
          done();
        }.bind(this));
      });
      it('should be removed by a DELETE request', function(done){
        chai.request('localhost:3000')
        .delete('/api/list-entries/' + this.listEntry.id)
        .end(function (err, res){
          expect(res.text).to.eql('Deleted list entry.');
          //Make sure that references to Lists and articles are removed.
          Article.findOne({_id: currentArticle._id}, 'lists', function(err, article){
            if (err) throw err;
            expect(article.lists).to.not.include(currentList._id);
            List.findOne({_id: currentList._id}, 'articles', function(err, list){
              if (err) throw err;
              expect(list.articles).to.not.include(currentArticle._id);
              done();
            });
          });
        });
      });
    });
  });
});
