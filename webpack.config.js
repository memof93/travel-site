var path = require('path'); //not required to install as it is a native part of node

module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    path: path.resolve(__dirname, "./app/temp/scripts"),
    filename: "App.js"
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}


/*
webpack.config esta siendo llamado al ejecutarse el gulp task 'scripts'
or with: npm run webpack at the console. in the package.json a script webpack should be defined

presets - to use ES6 ->'es2015' preset, to use ES7 -> 'es2017', react can also be added in presets
test - used to convert only the js files
exclude - to avoid converting the code that we don't write
*/
