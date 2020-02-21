const { Builder } = require('selenium-webdriver')
const path = require('path')
const assert = require('assert')
const LoginPage = require('../pages/LoginPage')

describe('Login', function() {
  this.timeout(30000)
  let driver
  let login

  beforeEach(async function() {
    const vendorDirectory =
      path.delimiter + path.join(__dirname, '..', 'vendor')
    process.env.PATH += vendorDirectory
    driver = await new Builder().forBrowser('firefox').build()
    login = new LoginPage(driver)
    await login.load()
  })

  afterEach(async function() {
    await driver.quit()
  })

  it('with valid credentials', async function() {
    await login.authenticate('tomsmith', 'SuperSecretPassword!')
    assert(await login.successMessagePresent(), 'Success message not displayed')
  })

  it('with invalid credentials', async function() {
    await login.authenticate('tomsmith', 'bad password')
    assert(await login.failureMessagePresent(), 'Failure message not displayed')
  })
})
