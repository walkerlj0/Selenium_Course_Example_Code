'use strict';
var webdriver = require('selenium-webdriver');
var driver,
    sessionId;
var baseUrl = process.env.BASE_URL || 'http://the-internet.herokuapp.com',
    host = process.env.HOST || 'saucelabs',
    browser = process.env.BROWSER || 'internet explorer',
    browserVersion = process.env.BROWSER_VERSION || '11.0',
    platform = process.env.PLATFORM || 'Windows 7',
    sauceUsername = process.env.SAUCE_USERNAME,
    sauceAccessKey = process.env.SAUCE_ACCESS_KEY;

var build = function() {
  if (host === 'saucelabs') {
    var url = 'http://' + process.env.SAUCE_USERNAME + ':' + 
                process.env.SAUCE_ACCESS_KEY + '@ondemand.saucelabs.com:80/wd/hub'
    var builder = new webdriver.Builder().usingServer(url)
    builder.withCapabilities({
      browserName: browser,
      browserVersion: browserVersion,
      platform: platform,
      username: sauceUsername,
      accessKey: sauceAccessKey
    });
  } else if (host === 'localhost') {
    var vendorDirectory = process.cwd() + '/vendor'
    process.env.PATH = vendorDirectory + ":$PATH"
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
module.exports.sessionId = sessionId;
