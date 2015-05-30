var gulp = require('gulp'); 
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var src = [
  'client/*.js*', 
  'client/components/*.js*', 
  'client/actions/*.js*', 
  'client/stores/*.js*'
]

gulp.task('lint', function(){
  return gulp.src(src)
    .pipe(eslint({
      globals: {
      "require": true
      },
      envs: {
        browser: true,
        es6: true
      },
      rules: {
        "quotes": [2, "single", "avoid-escape"],
        "no-console": 0
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
})

gulp.task('watch', function() {
  gulp.watch(src, ['lint']);
});
 
gulp.task('compress', function() {
  return gulp.src('client/public/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('client/public'));
});
 
gulp.task('minify-css', function() {
  return gulp.src('client/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('client/public'));
});

gulp.task('default', ['watch', 'lint']);
gulp.task('uglify', ['compress', 'minify-css'])
