var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('default', ['jshint', 'test']);

gulp.task('jshint', function(){
  gulp.src(['gulpfile.js', 'lib/*.js', 'test/*.js', 'public/*.js', 'index.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['jshint'], function(){
  gulp.src(['test/**/*.js'])
  .pipe(mocha({reporter: 'nyan'}));
});
