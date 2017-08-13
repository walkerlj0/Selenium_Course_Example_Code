'use strict';

var driver;

function BasePage(driver) {
  this.driver = driver;
}

BasePage.prototype.visit = function(url) {
  this.driver.get(url);
};

BasePage.prototype.find = function(locator) {
  return this.driver.findElement(locator);
};

BasePage.prototype.click = function(locator) {
  this.find(locator).click();
};

BasePage.prototype.type = function(locator, inputText) {
  this.find(locator).sendKeys(inputText);
};

BasePage.prototype.isDisplayed = function(locator) {
  return this.find(locator).isDisplayed();
};

module.exports = BasePage;
