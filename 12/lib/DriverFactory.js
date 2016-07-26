'use strict';
var webdriver = require('selenium-webdriver');
var config = require('./config');
var driver;

function DriverFactory(driver) {
  this.build();
}

DriverFactory.prototype.build = function() {
  var builder;
  if (config.browser === 'chrome') {
    var vendorDirectory = process.cwd() + '/vendor';
    process.env.PATH = vendorDirectory + ":$PATH";
  }
  builder = new webdriver.Builder().forBrowser(config.browser);
  this.driver = builder.build();
};

DriverFactory.prototype.quit = function() {
  this.driver.quit();
};

module.exports = DriverFactory;
