'use strict';

var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('compress', function() {
  gulp.src([
      'scripts/app.js',
      'scripts/controllers/main.js',
      'scripts/directives/todos.js',
      'scripts/services/data.js'])
    .pipe(minify({
        exclude: ['tasks']
    }))
    .pipe(gulp.dest('dist'))
});
