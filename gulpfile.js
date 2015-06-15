var gulp = require('gulp')
  , gutil = require('gulp-util')
  , browserify = require('browserify')
  , watchify = require('watchify')
  , source = require('vinyl-source-stream')
  , streamify = require('gulp-streamify')
  , less = require('gulp-less')
  , uglify = require('gulp-uglify')

var onError = function(error) {
  gutil.log(gutil.colors.red(error.message))
}

gulp.task('js', function() {
  var bundleStream = watchify(browserify('./src/js/index.js'))
    .on('update', rebundle)
    .on('log', gutil.log)

  function rebundle() {
    return bundleStream.transform('brfs').bundle()
      .on('error', onError)
      .pipe(source('index.js'))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest('./assets/js'))
  }

  return rebundle()
})

gulp.task('less', function() {
  gulp.src('src/less/index.less')
    .pipe(less({ compress: true })).on('error', gutil.log)
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('default', ['js', 'less'])
