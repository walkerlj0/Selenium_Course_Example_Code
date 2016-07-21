'use strict';

var BasePage = require('./BasePage');

function LoginPage(driver) {
  BasePage.call(this, driver);
  this.visit('http://the-internet.herokuapp.com/login');
}

LoginPage.prototype = Object.create(BasePage.prototype);
LoginPage.prototype.constructor = LoginPage;

var USERNAME_INPUT = {id: 'username'};
var PASSWORD_INPUT = {id: 'password'};
var SUBMIT_BUTTON = {css: 'button'};
var SUCCESS_MESSAGE = {css: '.flash.success'};
var FAILURE_MESSAGE = {css: '.flash.error'};

LoginPage.prototype.with = function(username, password) {
  this.type(USERNAME_INPUT, username);
  this.type(PASSWORD_INPUT, password);
  this.click(SUBMIT_BUTTON);
};

LoginPage.prototype.successMessagePresent = function() {
  return this.isDisplayed(SUCCESS_MESSAGE);
}

LoginPage.prototype.failureMessagePresent = function() {
  return this.isDisplayed(FAILURE_MESSAGE);
}

module.exports = LoginPage;
