'use strict';
var webdriver = require('selenium-webdriver');
var driver;

function DriverFactory(driver) {
  this.build();
}

DriverFactory.prototype.build = function() {
  var builder;
  builder = new webdriver.Builder().forBrowser('firefox');
  this.driver = builder.build();
};

DriverFactory.prototype.quit = function() {
  this.driver.quit();
};

module.exports = DriverFactory;
