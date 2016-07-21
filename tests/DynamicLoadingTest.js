'use strict';
var assert = require('assert')
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var DriverFactory = require('../lib/DriverFactory');
var DynamicLoadingPage = require('../pages/DynamicLoadingPage');

test.describe('Dynamic Loading', function() {
  this.timeout(30000); // for mocha
  var dynamicLoading;

  test.beforeEach(function() {
    dynamicLoading = new DynamicLoadingPage(DriverFactory.build());
  });

  test.afterEach(function() {
    DriverFactory.quit();
  });

  test.it('hidden element', function() {
    dynamicLoading.loadExample('1');
    dynamicLoading.finishTextPresent().then(function(elementDisplayed) {
      assert.equal(elementDisplayed, true, 'Finish text not displayed');
    });
  });

  test.it('rendered element', function() {
    dynamicLoading.loadExample('2');
    dynamicLoading.finishTextPresent().then(function(elementDisplayed) {
      assert.equal(elementDisplayed, true, 'Finish text not displayed');
    });
  });
});
