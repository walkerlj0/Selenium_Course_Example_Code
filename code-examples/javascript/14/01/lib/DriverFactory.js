const path = require('path')
const { Builder } = require('selenium-webdriver')
const { Eyes } = require('@applitools/eyes-selenium')

class DriverFactory {
  constructor(config) {
    this.config = config
  }

  _configure() {
    let builder = new Builder()
    switch (this.config.host) {
      case 'saucelabs':
        const url = 'http://ondemand.saucelabs.com:80/wd/hub'
        builder.usingServer(url)
        builder.withCapabilities(this.config.sauce)
        break
      case 'localhost':
        process.env.PATH +=
          path.delimiter + path.join(__dirname, '..', 'vendor')
        builder.forBrowser(this.config.browser)
        break
    }
    return builder
  }

  async _openEyes() {
    this.eyes = new Eyes()
    this.eyes.setApiKey(process.env.APPLITOOLS_API_KEY)
    return await this.eyes.open(
      this.driver,
      'the-internet',
      this.testName,
      this.config.viewportSize
    )
  }

  async build(testName, hasEyesCommands = false) {
    this.testName = testName
    process.env.PATH += path.delimiter + path.join(__dirname, '..', 'vendor')
    this.driver = await this._configure().build()
    if (hasEyesCommands) this.driver = await this._openEyes()
    return this.driver
  }

  async quit() {
    await this.driver.quit()
    if (this.eyes) await this.eyes.abortIfNotClosed()
  }
}

module.exports = DriverFactory
