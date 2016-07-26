'use strict';
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var DynamicLoadingPage = require('../pages/DynamicLoadingPage');

test.describe('Dynamic Loading', function() {
  this.timeout(30000);
  var driver;
  var dynamicLoading;

  test.beforeEach(function() {
    driver = new webdriver.Builder().forBrowser('firefox').build();
    dynamicLoading = new DynamicLoadingPage(driver);
  });

  test.afterEach(function() {
    driver.quit();
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
