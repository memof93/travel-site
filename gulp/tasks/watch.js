var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

//WATCH
gulp.task('watch', function() {
  /*Esta es la configuración usada para poder mostrar cierto archivo/pagina en
  los dispositivos que accedan al las URLs(local y externa)*/
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
  //instead of reloading the page everytime a css file changes, we inject them
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
    //gulp.start('styles'); // it runs all our postcss tasks
  });
  watch('./app/assets/scripts/**/*.js', function() {
    gulp.start('scriptsRefresh');
  })
});

/* when injecting 'styles' task the css would be converted and ready to display the
changes before the start of the 'cssInject task'(which is for applying the changes to the HTML)*/
gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});
//until the js bundle is generated (with scripts -> webpack) it doesn't refresh the page
gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
});
