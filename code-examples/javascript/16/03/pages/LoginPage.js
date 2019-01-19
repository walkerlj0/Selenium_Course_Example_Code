const { visit, click, type, isDisplayed } = require("../lib/selenium-util");
const assert = require("assert");

const LOGIN_FORM = { id: "login" };
const USERNAME_INPUT = { id: "username" };
const PASSWORD_INPUT = { id: "password" };
const SUBMIT_BUTTON = { css: "button" };
const SUCCESS_MESSAGE = { css: ".flash.success" };
const FAILURE_MESSAGE = { css: ".flash.error" };

async function load() {
  await visit("/login");
  assert.equal(
    await isDisplayed(LOGIN_FORM, 1000),
    true,
    "Login form not loaded"
  );
}

async function authenticate(username, password) {
  await type(USERNAME_INPUT, username);
  await type(PASSWORD_INPUT, password);
  await click(SUBMIT_BUTTON);
}

function isSuccessMessagePresent() {
  return isDisplayed(SUCCESS_MESSAGE, 1000);
}

function isFailureMessagePresent() {
  return isDisplayed(FAILURE_MESSAGE, 1000);
}

const LoginPage = {
  load,
  authenticate,
  isSuccessMessagePresent,
  isFailureMessagePresent
};

module.exports = LoginPage;
