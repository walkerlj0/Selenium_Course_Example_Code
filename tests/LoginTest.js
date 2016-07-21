'use strict';
var assert = require('assert')
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var DriverFactory = require('../lib/DriverFactory');
var LoginPage = require('../pages/LoginPage');

test.describe('Login', function() {
  this.timeout(30000); // for mocha
  var login;

  test.beforeEach(function() {
    login = new LoginPage(DriverFactory.build());
  });

  test.afterEach(function() {
    DriverFactory.quit();
  });

  test.it('with valid credentials', function() {
    login.with('tomsmith', 'SuperSecretPassword!');
    login.successMessagePresent().then(function(elementDisplayed) {
      assert.equal(elementDisplayed, true, 'Success message not displayed');
    });
  });

  test.it('with invalid credentials', function() {
    login.with('tomsmith', 'bad password');
    login.failureMessagePresent().then(function(elementDisplayed) {
      assert.equal(elementDisplayed, true, 'Failure message not displayed');
    });
    //login.successMessagePresent().then(function(elementDisplayed) {
    //  assert.equal(elementDisplayed, false, "Success message displayed");
    //});
  });
});
