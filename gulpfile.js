'use strict';

var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('compress', function() {
  gulp.src('scripts/*')
    .pipe(minify({
        exclude: ['tasks']
    }))
    .pipe(gulp.dest('dist'))
});
