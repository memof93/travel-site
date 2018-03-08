var $ = require('jquery');
var Person = require('./modules/Person');

console.log("This is a test for our webpack");
var john = new Person("John Doe", "Blue");
john.greet();
var jane = new Person("Jane Smith", "Orange");
jane.greet();

$("h1").remove();
