var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    browserify = require('browserify'),
    nodemon = require('gulp-nodemon'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade');

gulp.task('watch', function () {
  gulp.watch('./assets/**')
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
  // TODO browserify with jade
});
