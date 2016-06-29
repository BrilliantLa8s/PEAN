var gulp = require('gulp');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var run = require('run-sequence');
var del = require('del');

var config = require('./config/config.json');
var dir = './client/'

var paths = {
  styles:  [dir+'**/*.scss'],
  scripts: [dir+'**/*.js'],
  markup:  [dir+'**/*.html']
};

gulp.task('build:css', function() {
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('concat.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dir))
    .pipe(connect.reload());
});

gulp.task('build:js', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('concat.js'))
    .pipe(gulp.dest(dir))
    .pipe(connect.reload());
});

gulp.task('reload:html', function(){
  return gulp.src(paths.markup)
    .pipe(connect.reload());
})

gulp.task('clean', function() {
  del.sync(dir+'concat.js');
  del.sync(dir+'concat.css');
});

gulp.task('watch', function() {
  gulp.watch(paths.styles,  ['build:css']);
  gulp.watch(paths.scripts, ['build:js']);
  gulp.watch(paths.markup,  ['reload:html']);
});

gulp.task('serve', function () {
  nodemon({
    script:'server.js',
    ext:'js'
  });
  connect.server({
    root: dir,
    port: '3001',
    livereload: true,
    fallback: dir+'index.html',
    middleware: function (connect, opt) {
      return [
        proxy('/api', {
          target: 'http://localhost:3000',
          changeOrigin: true
        })
      ]
    }
  });
});

gulp.task('db:reset', shell.task([
  'psql -U postgres -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = \'cxp_development\' AND pid <> pg_backend_pid()"',
  'psql -U postgres -c "DROP DATABASE IF EXISTS '+config.development.database+'"',
  'psql -U postgres -c "CREATE DATABASE '+config.development.database+' WITH OWNER = postgres"',
  'sequelize db:migrate'
]));

gulp.task('build', ['clean', 'build:js', 'build:css']);
gulp.task('default', ['build']);

gulp.task('start', function(cb) {
  run('build', 'watch', 'serve', cb);
});
