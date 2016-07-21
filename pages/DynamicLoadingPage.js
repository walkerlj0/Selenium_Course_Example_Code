'use strict';

var BasePage = require('./BasePage');

function DynamicLoadingPage(driver) {
  BasePage.call(this, driver);
}

DynamicLoadingPage.prototype = Object.create(BasePage.prototype);
DynamicLoadingPage.prototype.constructor = DynamicLoadingPage;

var START_BUTTON = {css: '#start button'};
var FINISH_TEXT = {id: 'finish'};

DynamicLoadingPage.prototype.loadExample = function(exampleNumber) {
  this.visit('http://the-internet.herokuapp.com/dynamic_loading/' + exampleNumber);
  this.click(START_BUTTON);
};

DynamicLoadingPage.prototype.finishTextPresent = function() {
  return this.waitForIsDisplayed(FINISH_TEXT, 10000);
};

module.exports = DynamicLoadingPage;
