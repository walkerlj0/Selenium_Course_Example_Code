'use strict';
var test = require('selenium-webdriver/testing');
var DriverFactory = require('../lib/DriverFactory'),
    driverFactory;
var driver;

test.beforeEach(function() {
  this.timeout(30000);
  driverFactory = new DriverFactory();
  driver = driverFactory.driver;
  global.driver = driver;
});

test.afterEach(function() {
  this.timeout(30000);
  var testName = this.currentTest.fullTitle(),
      testResult = (this.currentTest.state === 'passed') ? true : false;
  driverFactory.quit(testName, testResult);
});
