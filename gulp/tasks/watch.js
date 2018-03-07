var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

//WATCH
gulp.task('watch', function() {
  /*Esta es la configuración usada para poder mostrar cierto archivo/pagina en
  los dispositivos que accedan al las URLs(local y externa)
  */
  browserSync.init({
    notify: false,
    server: {
      //Aqui puedo definir index: otroarchivo.html. Por default agarra el index.html
      baseDir: "app"
    }
    //Aqui podría definir un proxy que apunte a "mylocal.dev" o a una url
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
