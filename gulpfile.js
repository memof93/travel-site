var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'), //postcss is expecting an array
autoprefixer = require('autoprefixer'), //para que se agreguen las propiedades dependeindo del browser
cssvars = require('postcss-simple-vars'), //para poder usar variables en el css
nested = require('postcss-nested'), //allows you to nest properties in cs,
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create();

//se ejecuta por default si no se llama un método en especifico, es necesario
gulp.task('default', function() {
  console.log("Hooray - you created a Gulp task");
});

gulp.task('html', function() {
  console.log("Imagine something useful being done to your HTML here.");
});

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles')); //this file is the one that the browser can read
});

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

/*instead of running the 'styles' task directly we are calling the cssInject
which injects 'styles' and it won't start (aplying the changes of the css to the HTML)
until the 'styles' task is done and therefore the temp/styles/styles.css is updated*/
//al inyectar 'styles' se debe ejecutar y por lo tanto se modifica el styles.css
gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});
