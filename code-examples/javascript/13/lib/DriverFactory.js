const path = require('path')
const { Builder } = require('selenium-webdriver')
const { Eyes } = require('@applitools/eyes-selenium')

class DriverFactory {
  constructor(config) {
    this.config = config
  }

  async _openEyes() {
    this.eyes = new Eyes()
    this.eyes.setApiKey(process.env.APPLITOOLS_API_KEY)
    return await this.eyes.open(
      this.driver,
      'the-internet',
      this.testName,
      {
        width: this.config.viewportWidth,
        height: this.config.viewportHeight,
      }
    )
  }

  async build(testName, hasEyesCommands = false) {
    this.testName = testName
    process.env.PATH += path.delimiter + path.join(__dirname, '..', 'vendor')
    this.driver = await new Builder().forBrowser(this.config.browser).build()
    if (hasEyesCommands) this.driver = await this._openEyes()
    return this.driver
  }

  async quit() {
    await this.driver.quit()
    if (this.eyes) await this.eyes.abortIfNotClosed()
  }
}

module.exports = DriverFactory
