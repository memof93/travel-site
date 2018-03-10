var gulp = require('gulp'),
modernizr = require('gulp-modernizr');


/*used to check the features that our css and js files have to create a smaller modernizr object*/
gulp.task('modernizr', function() {
  return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
    .pipe(modernizr({
      "options": [
        "setClasses"
      ]
    }))
    .pipe(gulp.dest('./app/temp/scripts'));
});
