var gulp = require('gulp'),
postcss = require('gulp-postcss'), //postcss is expecting an array
autoprefixer = require('autoprefixer'), //para que se agreguen las propiedades dependeindo del browser
cssvars = require('postcss-simple-vars'), //para poder usar variables en el css
nested = require('postcss-nested'), //allows you to nest properties in cs,
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'), //allows to define media
hexrgba = require('postcss-hexrgba');

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end'); //to avoid 'watch' to stop when a syntax error occurs in the css
    })
    .pipe(gulp.dest('./app/temp/styles')); //this file is the one that the browser can read
});
