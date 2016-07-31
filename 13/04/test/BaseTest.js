'use strict';
var test = require('selenium-webdriver/testing');
var DriverFactory = require('../lib/DriverFactory'),
    driverFactory;
global.testTimeout = 30000;

test.beforeEach(function() {
  this.timeout(global.testTimeout);
  driverFactory = new DriverFactory();
  global.driver = driverFactory.driver;
});

test.afterEach(function() {
  this.timeout(global.testTimeout);
  var testName = this.currentTest.fullTitle(),
      testResult = (this.currentTest.state === 'passed') ? true : false;
  driverFactory.quit(testName, testResult);
});
