'use strict';
var webdriver = require('selenium-webdriver');

var driver;

var build = function() {
  var builder = new webdriver.Builder().forBrowser('firefox');
  driver = builder.build();
  return driver;
};

var quit = function() {
  driver.quit();
};

module.exports.build = build;
module.exports.quit = quit;
