'use strict';
var webdriver = require('selenium-webdriver');
var config = require('./config');
var driver,
    sessionId;

function DriverFactory(driver) {
  this.build();
}

DriverFactory.prototype.build = function() {
  var builder;
  if (config.host === 'saucelabs') {
    var url = 'http://ondemand.saucelabs.com:80/wd/hub';
    builder = new webdriver.Builder().usingServer(url);
    builder.withCapabilities({
      browserName: config.browser,
      browserVersion: config.browserVersion,
      platform: config.platform,
      username: config.sauceUsername,
      accessKey: config.sauceAccessKey
    });
  } else if (config.host === 'localhost') {
    if (config.browser === 'chrome') {
      var vendorDirectory = process.cwd() + '/vendor';
      process.env.PATH = vendorDirectory + ":$PATH";
    }
    builder = new webdriver.Builder().forBrowser(config.browser);
  }
  this.driver = builder.build();
  this.driver.getSession().then(function(sessionid){
      sessionId = sessionid.id_;
  });
};

DriverFactory.prototype.quit = function(testName) {
  if (config.host === 'saucelabs') {
    this.driver.executeScript('sauce:job-name=' + testName);
  }
  this.driver.quit();
};

module.exports = DriverFactory;
