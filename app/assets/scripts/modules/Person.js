function Person(fullName, favColor) {
  this.name = fullName;
  this.favoriteColor = favColor;
  this.greet = function() {
    console.log("Hello, my name is " + this.name + " and my favorite color is  " + this.favoriteColor + ".");
  }
}

 module.exports = Person;

/*
When someone requires a file it obtains an object called exports that lives in that file.
we can simply modify this exports properties and assign values or functions, but that is not the way they use it.
The exports object's parent is called module, so we usually set this property to the constructor name.
module.exports = class/constructorName;
*/
