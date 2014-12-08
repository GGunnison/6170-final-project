// author: Sabrina Drammis
var gulp       = require('gulp'),
    watch      = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    browserify = require('browserify'),
    nodemon    = require('gulp-nodemon'),
    concat     = require('gulp-concat'),
    jade       = require('gulp-jade'),
    source     = require('vinyl-source-stream'),
    less       = require('gulp-less');

gulp.task('watch', function () {
  gulp.watch('./views/**/*.*', ['scripts'])
      .on('change', livereload.changed);
  gulp.watch('./app/src/styles/**/*.less', ['less'])
      .on('change', livereload.changed);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon( {script: './bin/www', ext: 'html js'} )
    .on('start', ['scripts', 'less', 'watch'])
    .on('restart', function () {
      console.log('restarting server');
    });
});

gulp.task('less', function() {
  return gulp.src('./app/src/styles/employMeStyle.less')
             .pipe(less())
             .pipe(gulp.dest('./public/css'))
});

gulp.task('scripts', function () {
  var entries = ['indexController.js', 'searchResultsController.js'];
  entries.forEach( function (fileName) {
    browserify({
        entries: ['./app/src/' + fileName],
        extensions: ['.js'],
        debug: true
      }).transform('jadeify')
        .bundle()
        .pipe(source(fileName))
        .pipe(gulp.dest('public/js'))
  });
});
