'use strict';
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var LoginPage = require('../pages/LoginPage');

test.describe('Login', function() {
  this.timeout(30000);
  var driver;
  var login;

  test.beforeEach(function() {
    var vendorDirectory = process.cwd() + '/vendor';
    process.env.PATH = vendorDirectory + ":$PATH";
    driver = new webdriver.Builder().forBrowser('firefox').build();
    login = new LoginPage(driver);
  });

  test.afterEach(function() {
    driver.quit();
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
