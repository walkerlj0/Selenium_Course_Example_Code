'use strict';
var webdriver = require('selenium-webdriver');
var config = require('./config');
var driver,
    sessionId;

var build = function() {
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
  driver = builder.build();
  driver.getSession().then(function(sessionid) {
    sessionId = sessionid.id_;
  });
  return driver;
};

var quit = function(testName, testResult) {
  driver.executeScript('sauce:job-name=' + testName);
  driver.executeScript('sauce:job-result=' + testResult);
  driver.quit();
};

module.exports.build = build;
module.exports.quit = quit;
