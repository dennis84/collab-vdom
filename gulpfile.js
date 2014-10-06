var gulp = require('gulp')
  , gutil = require('gulp-util')
  , concat = require('gulp-concat')
  , browserify = require('gulp-browserify')
  , less = require('gulp-less')
  , stringify = require('stringify')

gulp.task('js', function() {
  gulp.src('src/js/index.js')
    .pipe(browserify({
      transform: stringify(['.html'])
    })).on('error', gutil.log)
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./assets/js'))
})

gulp.task('less', function() {
  gulp.src('src/less/index.less')
    .pipe(less({ compress: true })).on('error', gutil.log)
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('watch', function() {
  gulp.watch([
    'index.html',
    'src/**',
  ], ['js', 'less'])
})

gulp.task('default', ['js', 'less', 'watch'])
