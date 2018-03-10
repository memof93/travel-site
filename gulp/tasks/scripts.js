var gulp = require('gulp'),
webpack = require('webpack');

/*added modernizr to modify the DOM (HTML classes) depending on not all browser supported features(like svg, cssanimations, flexbox)*/
gulp.task('scripts', ['modernizr'], function(callback) {
  webpack(require('../../webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }
    console.log(stats.toString());
    callback(); //used to make sure that gulp is aware when webpack completes
  });
});
