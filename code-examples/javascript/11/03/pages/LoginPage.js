const Page = require('./Page')

const LOGIN_FORM = { id: 'login' }
const USERNAME_INPUT = { id: 'username' }
const PASSWORD_INPUT = { id: 'password' }
const SUBMIT_BUTTON = { css: 'button' }
const SUCCESS_MESSAGE = { css: '.flash.success' }
const FAILURE_MESSAGE = { css: '.flash.error' }

class LoginPage extends Page {
  constructor(driver) {
    super(driver)
  }

  async load() {
    await visit('http://the-internet.herokuapp.com/login')
    if (await !isDisplayed(LOGIN_FORM, 1000))
      throw new Error('Login form not loaded')
  }

  async authenticate(username, password) {
    await type(USERNAME_INPUT, username)
    await type(PASSWORD_INPUT, password)
    await click(SUBMIT_BUTTON)
  }

  successMessagePresent() {
    return isDisplayed(SUCCESS_MESSAGE, 1000)
  }

  failureMessagePresent() {
    return isDisplayed(FAILURE_MESSAGE, 1000)
  }
}

module.exports = LoginPage
