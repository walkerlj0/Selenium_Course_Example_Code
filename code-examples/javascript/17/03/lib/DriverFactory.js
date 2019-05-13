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

  async _openEyes(testName) {
    this.eyes = new Eyes()
    this.eyes.setApiKey(process.env.APPLITOOLS_API_KEY)
    return await this.eyes.open(this.driver, 'the-internet', testName, {
      width: 1024,
      height: 768,
    })
  }

  async build(testName, hasEyesCommands = false) {
    this.testName = testName
    process.env.PATH += path.delimiter + path.join(__dirname, '..', 'vendor')
    this.driver = await this._configure().build()
    const { id_ } = await this.driver.getSession()
    this.sessionId = id_
    if (hasEyesCommands) this.driver = await this._openEyes(testName)
    return this.driver
  }

  async quit(testPassed) {
    if (this.config.host === 'saucelabs') {
      this.driver.executeScript('sauce:job-name=' + this.testName)
      this.driver.executeScript('sauce:job-result=' + testPassed)
      if (!testPassed)
        throw new Error('See a video of the run at https://saucelabs.com/tests/' + this.sessionId);
    }
    await this.driver.quit()
    if (this.eyes) await this.eyes.abortIfNotClosed()
  }
}

module.exports = DriverFactory
