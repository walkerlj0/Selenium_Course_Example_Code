'use strict';
var webdriver = require('selenium-webdriver');
var config = require('./config');
var driver;

function DriverFactory(driver) {
  this.build();
};

DriverFactory.prototype.build = function() {
  if (config.host === 'saucelabs') {
    var url = 'http://ondemand.saucelabs.com:80/wd/hub'
    var builder = new webdriver.Builder().usingServer(url)
    builder.withCapabilities({
      browserName: config.browser,
      browserVersion: config.browserVersion,
      platform: config.platform,
      username: config.sauceUsername,
      accessKey: config.sauceAccessKey
    });
  } else if (config.host === 'localhost') {
      if (config.host === 'chrome') {
        var vendorDirectory = process.cwd() + '/vendor'
        process.env.PATH = vendorDirectory + ":$PATH"
      }
    var builder = new webdriver.Builder().forBrowser(browser);
  }
  this.driver = builder.build()
};

DriverFactory.prototype.quit = function(testName, testResult) {
  if (config.host === 'saucelabs') {
    this.driver.executeScript('sauce:job-name=' + testName);
    this.driver.executeScript('sauce:job-result=' + testResult);
  }
  this.driver.quit();
};

module.exports = DriverFactory;
