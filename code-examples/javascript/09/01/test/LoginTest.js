const { Builder } = require('selenium-webdriver')
const { Eyes } = require('@applitools/eyes-selenium')
const path = require('path')
const assert = require('assert')
const LoginPage = require('../pages/LoginPage')

describe('Login', function() {
  this.timeout(30000)
  let driver
  let eyes
  let login

  beforeEach(async function() {
    const vendorDirectory =
      path.delimiter + path.join(__dirname, '..', 'vendor')
    process.env.PATH += vendorDirectory
    driver = await new Builder().forBrowser('firefox').build()
    const hasEyesCommands = this.currentTest.body.match(/eyes\./)
    if (hasEyesCommands) {
      eyes = new Eyes()
      eyes.setApiKey(process.env.APPLITOOLS_API_KEY)
      driver = await eyes.open(
        driver,
        'the-internet',
        this.currentTest.fullTitle(),
        {
          width: 1024,
          height: 768,
        }
      )
    }
    login = new LoginPage(driver)
    await login.load()
  })

  afterEach(async function() {
    await driver.quit()
    if (eyes) await eyes.abortIfNotClosed()
  })

  it('with valid credentials', async function() {
    await login.authenticate('tomsmith', 'SuperSecretPassword!')
    assert(await login.successMessagePresent(), 'Success message not displayed')
    await eyes.checkWindow('Logged in')
    await eyes.close()
  })
})
