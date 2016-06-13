var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var run = require('run-sequence');
var del = require('del');

var dir = './client/'

var paths = {
  styles:  [dir+'**/*.scss'],
  scripts: [dir+'**/*.js']
};

gulp.task('build:css', function() {
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('concat.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dir));
});

gulp.task('build:js', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('concat.js'))
    .pipe(gulp.dest(dir));
});

gulp.task('clean', function () {
  del.sync(dir+'concat.js');
  del.sync(dir+'concat.css');
});

gulp.task('watch', function() {
  gulp.watch(paths.styles,  ['build:css']);
  gulp.watch(paths.scripts, ['build:js']);
});

gulp.task('build', ['clean', 'build:js', 'build:css']);
gulp.task('default', ['build']);

gulp.task('start', function(cb) {
  run('build', 'watch', cb);
});
