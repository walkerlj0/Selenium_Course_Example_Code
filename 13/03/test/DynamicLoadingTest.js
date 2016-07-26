'use strict';
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var BaseTest = require('./BaseTest');
var DynamicLoadingPage = require('../pages/DynamicLoadingPage');

test.describe('Dynamic Loading', function() {
  this.timeout(global.test_timeout);
  var dynamicLoading;

  test.beforeEach(function() {
    dynamicLoading = new DynamicLoadingPage(global.driver);
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
