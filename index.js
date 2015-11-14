var mongoose = require('mongoose');
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var frequency = require(__dirname + '/lib/frequency');
var collectionRouter = require(__dirname + '/routes/collection_routes.js');
var articleRouter = require(__dirname + '/routes/article_routes.js');
var Article = require(__dirname + '/models/article').Article;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/nlp_database');

app.use('/api', collectionRouter);
app.use('/api', articleRouter);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/process', bodyParser.urlencoded({extended: true}), function(req, res){
  var frequencyObject = frequency((req.body.text));
  var mappedArray = [];
  var i = 0;
  for (var key in frequencyObject){
    mappedArray[i] = {};
    mappedArray[i].word = key;
    mappedArray[i].count = frequencyObject[key];
    i++;
  }
  var newArticle = new Article({title: "Default Title", wordcounts: mappedArray});
  var returnJSON = JSON.stringify(frequencyObject);
  newArticle.save(function(err, data) {
    if(err) throw err;
    console.log('Saved!')
  });
  res.send(returnJSON);
});

app.listen(3000, function(){
  console.log('server up!');
});
