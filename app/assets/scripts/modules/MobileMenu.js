import $ from 'jquery';

class MobileMenu {
  constructor() {
    this.siteHeader = $(".site-header");
    this.menuIcon = $(".site-header__menu-icon");
    this.menuContent = $(".site-header__menu-content");
    this.events();
  }

  events() {
    this.menuIcon.click(this.toggleTheMenu.bind(this));
  }

  toggleTheMenu() {
    this.menuContent.toggleClass("site-header__menu-content--is-visible");
    this.siteHeader.toggleClass("site-header--is-expanded");
    this.menuIcon.toggleClass("site-header__menu-icon--close-x");
  }
}

export default MobileMenu;


/*
Avoid spaghetti jquery:

$(".site-header__menu-icon").click(function() {
  console.log("Top right icon was clicked.");
});

A - Selecting an element from DOM
B - Even handling
C - Defining functionality

without the .bind() --> when toggleTheMenu runs its 'this' would point to the DOM element(stored in menuContent)

*/
