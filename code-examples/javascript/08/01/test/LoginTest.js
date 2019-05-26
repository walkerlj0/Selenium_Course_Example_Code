const { Builder } = require('selenium-webdriver')
const { Eyes } = require('@applitools/eyes-selenium')
const path = require('path')
const assert = require('assert')

describe('Login', function() {
  this.timeout(30000)
  let driver
  let eyes

  beforeEach(async function() {
    const vendorDirectory =
      path.delimiter + path.join(__dirname, '..', 'vendor')
    process.env.PATH += vendorDirectory
    driver = await new Builder().forBrowser('firefox').build()
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
  })

  afterEach(async function() {
    await driver.quit()
    if (eyes) await eyes.abortIfNotClosed()
  })

  it('with valid credentials', async function() {
    await driver.get('http://the-internet.herokuapp.com/login')
    await driver.findElement({ id: 'username' }).sendKeys('tomsmith')
    await driver
      .findElement({ id: 'password' })
      .sendKeys('SuperSecretPassword!')
    await driver.findElement({ css: 'button' }).click()
    assert(
      await driver.findElement({ css: '.flash.success' }).isDisplayed(),
      'Success message not displayed'
    )
    await eyes.checkWindow('Logged in')
    await eyes.close()
  })
})
