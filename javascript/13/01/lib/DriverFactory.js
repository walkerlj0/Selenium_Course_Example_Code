const path = require('path')
const { Builder } = require('selenium-webdriver')

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

  async build() {
    this.driver = await this._configure().build()
  }

  async quit() {
    await this.driver.quit()
  }
}

module.exports = DriverFactory
