'use strict';
var BasePage = require('./BasePage');
var assert = require('assert');
var sleep = require('sleep');

var LOGIN_FORM = {id: 'login'};
var USERNAME_INPUT = {id: 'username'};
var PASSWORD_INPUT = {id: 'password'};
var SUBMIT_BUTTON = {css: 'button'};
var SUCCESS_MESSAGE = {css: '.flash.success'};
var FAILURE_MESSAGE = {css: '.flash.error'};

function LoginPage(driver) {
  BasePage.call(this, driver);
  this.visit('http://the-internet.herokuapp.com/login');
  this.isDisplayed(LOGIN_FORM).then(function(elementDisplayed) {
    assert.equal(elementDisplayed, true, 'Login form not loaded');
  });
}

LoginPage.prototype = Object.create(BasePage.prototype);
LoginPage.prototype.constructor = LoginPage;

LoginPage.prototype.with = function(username, password) {
  this.type(USERNAME_INPUT, username);
  this.type(PASSWORD_INPUT, password);
  this.click(SUBMIT_BUTTON).then(function() {
    sleep.sleep(1);
  });
};

LoginPage.prototype.successMessagePresent = function() {
  return this.isDisplayed(SUCCESS_MESSAGE);
};

LoginPage.prototype.failureMessagePresent = function() {
  return this.isDisplayed(FAILURE_MESSAGE);
};

module.exports = LoginPage;
