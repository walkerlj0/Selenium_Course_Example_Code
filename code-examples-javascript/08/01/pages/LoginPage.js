'use strict';
var sleep = require('sleep');

var driver;
var USERNAME_INPUT = {id: 'username'};
var PASSWORD_INPUT = {id: 'password'};
var SUBMIT_BUTTON = {css: 'button'};
var SUCCESS_MESSAGE = {css: '.flash.success'};

function LoginPage(driver) {
  this.driver = driver;
  this.driver.get('http://the-internet.herokuapp.com/login');
}

LoginPage.prototype.with = function(username, password) {
  this.driver.findElement(USERNAME_INPUT).sendKeys(username);
  this.driver.findElement(PASSWORD_INPUT).sendKeys(password);
  this.driver.findElement(SUBMIT_BUTTON).click().then(function() {
    sleep.sleep(1);
  });
};

LoginPage.prototype.successMessagePresent = function() {
  return this.driver.findElement(SUCCESS_MESSAGE).isDisplayed();
};

module.exports = LoginPage;
