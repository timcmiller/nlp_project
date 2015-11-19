var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../index.js');

describe('our NLP sever', function() {

  before(function(done) {
    fs.readFile(__dirname + '/../views/index.html', function(err, data) {
      if(err) throw err;
      this.indexHtml = data.toString();

      done();

    }.bind(this));
  });

  before(function(done) {
    fs.readFile(__dirname + '/../views/about-us.html', function(err, data) {
      if(err) throw err;
      this.aboutUsHtml = data.toString();

      done();

    }.bind(this));
  });

  before(function(done) {
    fs.readFile(__dirname + '/../views/language-views/fr.html', function(err, data) {
      if(err) throw err;
      this.fr = data.toString();

      done();

    }.bind(this));
  });

  before(function(done) {
    fs.readFile(__dirname + '/../views/language-views/pt.html', function(err, data) {
      if(err) throw err;
      this.pt = data.toString();

      done();

    }.bind(this));
  });

  before(function(done) {
    fs.readFile(__dirname + '/../views/language-views/sw.html', function(err, data) {
      if(err) throw err;
      this.sw = data.toString();

      done();

    }.bind(this));
  });

  before(function(done) {
    fs.readFile(__dirname + '/../views/404.html', function(err, data) {
      if(err) throw err;
      this.fourOhFourHtml = data.toString();

      done();

    }.bind(this));
  });

  it('should respond to a GET request with our index page', function(done) {
    chai.request('localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql(this.indexHtml);
        done();
      }.bind(this));
  });

  it('should respond to a POST request to the process URL', function(done){
    chai.request('localhost:3000')
    .post('/process')
    .type('form')
    .send('text=Happy Birthday to You!')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.text).to.be.an('string');
      expect(JSON.parse(res.text).sentiment).to.eql('Positive');
      expect(JSON.parse(res.text).posTerms).to.eql({happy: 1});

      done();
    });
  });
  it('should give a 404 error with a non-existing endpoint', function(done){
    chai.request('localhost:3000')
    .get('/sosorrymrlemur')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.status).to.eql(404);
      expect(res.text).to.eql(this.fourOhFourHtml);

      done();
    }.bind(this));
  });

  it('should respond to GET request to about-me route', function(done) {
    chai.request('localhost:3000')
      .get('/about-us')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql(this.aboutUsHtml);

        done();
    }.bind(this));
  });

  it('should respond to GET request to /fr route', function(done) {
    chai.request('localhost:3000')
      .get('/fr')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql(this.fr);

        done();
    }.bind(this));
  });

  it('should respond to GET request to /pt route', function(done) {
    chai.request('localhost:3000')
      .get('/pt')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql(this.pt);

        done();
    }.bind(this));
  });

  it('should respond to GET request to /sw route', function(done) {
    chai.request('localhost:3000')
      .get('/sw')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql(this.sw);

        done();
    }.bind(this));
  });

  it('should respond to GET request to list route', function(done) {
    chai.request('localhost:3000')
      .get('/lists')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);

        done();
    }.bind(this));
  });

  it('should respond to GET request to lists route', function(done) {
    chai.request('localhost:3000')
      .get('/lists/id')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);

        done();
    }.bind(this));
  });
});
