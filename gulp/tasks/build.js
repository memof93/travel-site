var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

//preview dist - to test that all the app works fine with the rev and compressed files
gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "dist"
    }
  });
});

//used to delete the distributable folder. should be called at the begining of every build
gulp.task('deleteDistFolder', function() {
  return del('./dist');
});

//used to add other files excluding the html, images, styles, scripts and the temps
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  //la carpeta de assets(vacia) no la excluimos porque al usar usemin los scripts y styles se guardan ahí
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ];
  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./dist'))
});

/*used to include just the necesary images and to optimize them.
We inject icons to have a fresh rebuild of the icons brain*/
gulp.task('optimizeImages', ['deleteDistFolder', 'icons'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    //tool used to compress files
    .pipe(imagemin({
      progressive: true, //used to optimize jpg images even further
      interlaced: true, //would help with any gif image that we have
      multipass: true //would help with our svg files
    }))
    .pipe(gulp.dest('./dist/assets/images'));
});

/*used to add rev and compress css files and the bundle scripts, the ones that the html include (the bundles)
we inject styles and scripts so we have the fresher(updated) version of the application*/
gulp.task('usemin',['deleteDistFolder', 'styles', 'scripts'],  function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest('./dist'));
});

//build would be the shortcut runned in the command line that would trigger to call other tasks
gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);


//the path that starts with '!./' is used to exclude those files as they are not required by the user
