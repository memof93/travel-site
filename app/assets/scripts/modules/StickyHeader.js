import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
  constructor() {
    console.log("Sticky header working ;)");
    this.siteHeader = $(".site-header");
    this.headerTriggerElement = $(".large-hero__title");
    this.createHeaderWaypoint();
    this.pageSections = $(".page-section");
    this.headerLinks = $(".primary-nav a");
    this.createPageSectionWaypoints();
    this.addSmoothScrolling();
  }

  addSmoothScrolling(){
    //we just need to call smoothScroll on each of the header links we want to scroll smoothly
    this.headerLinks.smoothScroll();
  }
  createHeaderWaypoint() {
    new Waypoint({
      element: this.headerTriggerElement[0],
      handler: (direction) => {
        if(direction == "down") {
          this.siteHeader.addClass("site-header--dark");
        } else {
          this.siteHeader.removeClass("site-header--dark");
        }
      }
    });
  }

  createPageSectionWaypoints() {
    this.pageSections.each((index, currentPageSection) => {
      new Waypoint({
        element: currentPageSection,
        handler: (direction) => {
          if(direction == "down") {
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            this.headerLinks.removeClass("is-current-link"); //deletes the class to all elements
            $(matchingHeaderLink).addClass("is-current-link"); //add it to there required one
          }
        },
        offset: "18%"
      });
      new Waypoint({
        element: currentPageSection,
        handler: (direction) => {
          if(direction == "up") {
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            this.headerLinks.removeClass("is-current-link"); //deletes the class to all elements
            $(matchingHeaderLink).addClass("is-current-link"); //add it to there required one
          }
        },
        offset: "-40%"
      });
    });
  }
}

export default StickyHeader;

/*
the first element of a jquery object is always a pointer to the native DOM element
the keyword 'this' is accesible in every context of the createHeaderWaypoint method
the currentPageSection (parameter of .each()) is already a native DOM element thanks to the jquery method .each()
*/
