import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
class RevealOnScroll {
  constructor(els, offset) {
    this.itemsToReveal = els;
    this.offsetPercentage = offset;
    this.hideInitially();
    this.createWaypoints();
  }

  hideInitially() {
    this.itemsToReveal.addClass("reveal-item");
  }

  createWaypoints() {
    this.itemsToReveal.each((index, element) => {
      //podria usar directamente element pero es para hacer más entendible el código
      var currentItem = element;
      new Waypoint({
        element: currentItem,
        handler: () => {
          $(currentItem).addClass("reveal-item--is-visible");
        },
        offset: this.offsetPercentage
      });
    });
  }
}

export default RevealOnScroll;


/*
When using function() inside the .each() method, inside the function the 'this' keyword points to each element(DOM)
so if we want to modify any property of the class we need to save our object before the .each method. var that = this;
when using (ind, elem) inside the .each method, insde the function the 'this' keyword still points to the class object
and the elem variable is the one that contains the element(DOM)

inside function() the 'this' keyword changes, using () => the 'this' keyword is the same (class object)
if we console.log(this) on both cases in the handler we would get:
function() - the Waypoint object
() => - the RevealOnScroll object
*/
