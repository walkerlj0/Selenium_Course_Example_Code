const {
  set,
  visit,
  click,
  type,
  isDisplayed
} = require("../lib/selenium-util");

const LOGIN_FORM = { id: "login" };
const USERNAME_INPUT = { id: "username" };
const PASSWORD_INPUT = { id: "password" };
const SUBMIT_BUTTON = { css: "button" };
const SUCCESS_MESSAGE = { css: ".flash.success" };
const FAILURE_MESSAGE = { css: ".flash.error" };

async function load(driver) {
  set(driver);
  await visit("/login");
  if (await !isDisplayed(LOGIN_FORM, 1000))
    throw new Error("Login form not loaded");
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
