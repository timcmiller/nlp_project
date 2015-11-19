var mongoose = require('mongoose');
var app = require('express')();
var favicon = require('serve-favicon');
var port = process.env.PORT || 3000;

var Article = require(__dirname + '/models/article').Article;

var listRouter = require(__dirname + '/routes/list_routes.js');
var listEntryRouter = require(__dirname + '/routes/listentry_routes.js');
var articleRouter = require(__dirname + '/routes/article_routes.js');
var staticRouter = require(__dirname + '/routes/static_routes.js');
var twitterRouter = require(__dirname + '/routes/twitter_routes.js');

Article.find({}, function(err, data){
  if(data.length < 5) {require(__dirname + '/lib/population.js');}
});

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/nlp_database');

app.use('/api', listRouter);
app.use('/api', articleRouter);
app.use('/api', twitterRouter);
app.use('/api', listEntryRouter);
app.use(staticRouter);

app.listen(port, function(){
  console.log('server up!');
});


