var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'), //wants its options to be defined as an object
rename = require('gulp-rename'),
del = require('del');

//this configuration is required to transform all the svg files into one
var config = {
  mode: {
    css: { //sin agregar lo siguiente ya generaba la imagen con todos los elementos
      sprite: 'sprite.svg',
      render: {
        css: {
          //aqui está la magia, la estructura que se le dará a cada elemento generado (casa svg con su css)
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

//this task is to avoid having repeated Sprites when adding or deleting icons (and running the icons task)
gulp.task('beginClean', function () {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function () {
  // /** is used in case there are subfolders inside /icons to find any .svg file
  return gulp.src('./app/assets/images/icons/**/*.svg') //agarra todo los iconos
    .pipe(svgSprite(config)) //se aplica la configuración
    .pipe(gulp.dest('./app/temp/sprite/'));
    //el resultado se guarda aquí -> el svg con todos los iconos y el archivo sprite.css (por el template)
});

/*toma el svg creado(sprite) en createSprite y lo guarda en assets/images/sprites
tambien modificamos el path de donde toma la imagen el template, para que lo busque en assets/images/sprites*/
gulp.task('copySpriteGraphic', ['createSprite'], function () {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
  .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'],  function () {
  return gulp.src('./app/temp/sprite/css/**/*.css')
  .pipe(rename('_sprite.css')) //rename it to have the same format with '_name' to indicate that it is a partial css
  .pipe(gulp.dest('./app/assets/styles/modules'));
});

//after all previous tasks are completed we no longer need the temp sprite file as it is already copied in modules/_sprite.css
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteGraphic'], function () {
  return del('./app/temp/sprite');
});
//as copySpriteCSS requires createSprite when we run the task 'icons' it would load/execute first createSprite and then copySpriteCSS
gulp.task('icons', ['beginClean','createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
