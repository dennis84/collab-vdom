var gulp = require('gulp')
  , gutil = require('gulp-util')
  , browserify = require('browserify')
  , source = require('vinyl-source-stream')
  , streamify = require('gulp-streamify')
  , less = require('gulp-less')
  , uglify = require('gulp-uglify')

gulp.task('js', function() {
  return browserify('./src/js/index.js')
    .transform('brfs')
    .bundle()
    .on('error', gutil.log)
    .pipe(source('index.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./assets/js'))
})

gulp.task('less', function() {
  gulp.src('src/less/index.less')
    .pipe(less({ compress: true })).on('error', gutil.log)
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('watch', function() {
  gulp.watch(['index.html', 'src/**'], ['js', 'less'])
})

gulp.task('default', ['js', 'less', 'watch'])
