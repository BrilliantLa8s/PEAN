var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var strip = require('gulp-strip-comments');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var templates = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var shell = require('gulp-shell');
var run = require('run-sequence');
var del = require('del');
var config = require('./config/db.json')['development'];

var src = './client/src/'
var build = './client/build/'
var vendor = require('./vendor.js');

var paths = {
  styles:  [src+'styles.scss',src+'**/*.scss'],
  scripts: [src+'**/*.js'],
  markup:  [src+'**/*.html']
};

gulp.task('build:vendor:css', function() {
  return gulp.src(vendor.styles)
    .pipe(concat('vendor.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(build))
});

gulp.task('build:vendor:js', function() {
  return gulp.src(vendor.scripts)
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(build))
});

gulp.task('build:css', function() {
  return gulp.src(paths.styles[0])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(build))
    .pipe(connect.reload());
});

gulp.task('build:js', function() {
  return gulp.src(paths.scripts)
    .pipe(strip())
    .pipe(ngAnnotate())
    .pipe(uglify({mangle:true}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(build))
    .pipe(connect.reload());
});

gulp.task('build:html', function(){
  return gulp.src(paths.markup)
    .pipe(templates({module:'app'}))
    .pipe(gulp.dest(build))
    .pipe(connect.reload());
});

gulp.task('clean', function() {
  del.sync(build+'*');
});

gulp.task('watch:styles', function() {
  gulp.watch(paths.styles,  ['build:css']);
});

gulp.task('watch:scripts', function() {
  gulp.watch(paths.scripts, ['build:js']);
});

gulp.task('watch:views', function() {
  gulp.watch(paths.markup,  ['build:html']);
});

gulp.task('serve', function () {
  nodemon({
    script:'server.js',
    ext:'js'
  });
  connect.server({
    root: './client',
    port: '3001',
    livereload: true,
    fallback: './client/index.html',
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

// Main tasks
gulp.task('build', ['clean', 'build:vendor:js', 'build:vendor:css', 'build:js', 'build:css', 'build:html']);
gulp.task('default', ['build']);
gulp.task('watch', ['watch:styles','watch:scripts','watch:views']);

gulp.task('start', function(cb) {
  run('build', 'watch', 'serve', cb);
});

// Database tasks
gulp.task('db:create', shell.task([
  'psql -U postgres -c "CREATE DATABASE '+config.database+' WITH OWNER = '+config.username+'"'
]));
gulp.task('db:reset', shell.task([
  'psql -U postgres -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = \''+config.database+'\' AND pid <> pg_backend_pid()"',
  'psql -U postgres -c "DROP DATABASE IF EXISTS '+config.database+'"',
  'psql -U postgres -c "CREATE DATABASE '+config.database+' WITH OWNER = '+config.username+'"',
  'sequelize db:migrate'
]));

// Deploy tasks
var tag = 'deploy-' + new Date().getTime();

gulp.task('branch', shell.task([
  'git stash',
  'git checkout --orphan '+tag,
  'git add client/build -f',
  'rm -rf client/src',
  'git add .',
  'git commit -am "commit for '+tag+'"'
]));

gulp.task('push:test', shell.task(['git push test '+tag+':master -f']));
gulp.task('push:prod', shell.task(['git push prod '+tag+':master -f']));

gulp.task('revert', shell.task([
  'git checkout master',
  'git checkout master .',
  'git branch -D '+tag
]));

gulp.task('deploy:test', function(cb) {
  run('build', 'branch', 'push:test', 'revert', cb);
});
gulp.task('deploy:production', function(cb) {
  run('build', 'branch', 'push:prod', 'revert', cb);
});
