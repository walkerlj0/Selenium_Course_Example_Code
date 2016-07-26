'use strict';
var test = require('selenium-webdriver/testing');
var DriverFactory = require('../lib/DriverFactory'),
    driverFactory;
global.test_timeout = 30000;

test.beforeEach(function() {
  this.timeout(global.test_timeout);
  driverFactory = new DriverFactory();
  global.driver = driverFactory.driver;
});

test.afterEach(function() {
  this.timeout(global.test_timeout);
  driverFactory.quit();
});
