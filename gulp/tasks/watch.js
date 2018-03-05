var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

//WATCH
gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });
  watch('./app/index.html', function(){
    browserSync.reload();
  });
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
    //gulp.start('styles'); // it runs all our postcss tasks
  });
});

/* when injecting 'styles' task the css would be converted and ready to display the
changes before the start of the 'cssInject task'(which is for applying the changes to the HTML)*/
gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});
