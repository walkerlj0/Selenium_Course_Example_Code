'use strict';
var assert = require('assert');

var driver;
var LOGIN_FORM = {id: 'login'};
var USERNAME_INPUT = {id: 'username'};
var PASSWORD_INPUT = {id: 'password'};
var SUBMIT_BUTTON = {css: 'button'};
var SUCCESS_MESSAGE = {css: '.flash.success'};
var FAILURE_MESSAGE = {css: '.flash.error'};

function LoginPage(driver) {
  this.driver = driver;
  this.driver.get('http://the-internet.herokuapp.com/login');
  this.driver.findElement(LOGIN_FORM).isDisplayed().then(function(elementDisplayed) {
    assert.equal(elementDisplayed, true, 'Login form not loaded');
  });
}

LoginPage.prototype.with = function(username, password) {
  this.driver.findElement(USERNAME_INPUT).sendKeys(username);
  this.driver.findElement(PASSWORD_INPUT).sendKeys(password);
  this.driver.findElement(SUBMIT_BUTTON).click();
};

LoginPage.prototype.successMessagePresent = function() {
  return this.driver.findElement(SUCCESS_MESSAGE).isDisplayed();
};

LoginPage.prototype.failureMessagePresent = function() {
  return this.driver.findElement(FAILURE_MESSAGE).isDisplayed();
};

module.exports = LoginPage;
