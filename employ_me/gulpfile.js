var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    browserify = require('browserify'),
    nodemon = require('gulp-nodemon'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    source = require('vinyl-source-stream');

gulp.task('watch', function () {
  gulp.watch('./assets/**', ['scripts'])
      .on('change', livereload.changed);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon( {script: './bin/www', ext: 'html js'} )
    .on('start', ['scripts', 'watch'])
    .on('restart', function () {
      console.log('restarting server');
    });
});

gulp.task('scripts', function () {
  console.log('starting scripts');
  browserify({
    entries: ['./assets/src/testing.js'],
    extensions: ['.js'],
    debug: true
  }).transform('jadeify')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('public/js'))
});


// TODO finish this
gulp.task('bower', function () {
  gulp.src(mainBowerFiles(), {
    base: 'bower_components'
  }).pip(gulp.dest('public/lib'));
});
