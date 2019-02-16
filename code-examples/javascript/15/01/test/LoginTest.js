'use strict';
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var BaseTest = require('./BaseTest');
var LoginPage = require('../pages/LoginPage');

test.describe('Login', function() {
  this.timeout(global.test_timeout);
  var login;

  test.beforeEach(function() {
    login = new LoginPage(global.driver);
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
