var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'), //wants its options to be defined as an object
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

//this configuration is required to transform all the svg files into one
var config = {
  //shape is used to avoid the white lines in the icons (cause because they are created immediately one after the other)
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: { //sin agregar lo siguiente ya generaba la imagen con todos los elementos
      //this variable object is added when using svg2png if not, don't include it
      variables: {
        replaceSvgWithPng: function () {
          return function(sprite, render) {
            //this returns the svg files with the extension name changed (to png)
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite: 'sprite.svg',
      render: {
        css: {
          //aqui está la magia, la estructura que se le dará a cada elemento generado (cada svg con su css)
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
/*en la misma carpeta temp guarda una copia del svg en formato png*/
gulp.task('createPngCopy', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.svg')
  .pipe(svg2png())
  .pipe(gulp.dest('./app/temp/sprite/css'));
});

/*toma el svg creado(sprite) en createSprite y lo guarda en assets/images/sprites
tambien modificamos el path de donde toma la imagen el template, para que lo busque en assets/images/sprites
al cargar createPngCopy carga tmb createSprite y luego ejecuta el código*/
gulp.task('copySpriteGraphic', ['createPngCopy'], function () {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
  .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'],  function () {
  return gulp.src('./app/temp/sprite/css/*.css')
  .pipe(rename('_sprite.css')) //rename it to have the same format with '_name' to indicate that it is a partial css
  .pipe(gulp.dest('./app/assets/styles/modules'));
});

//after all previous tasks are completed we no longer need the temp sprite file as it is already copied in modules/_sprite.css
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function () {
  return del('./app/temp/sprite');
});
//as copySpriteCSS requires createSprite when we run the task 'icons' it would load/execute first createSprite and then copySpriteCSS
gulp.task('icons', ['beginClean','createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
