// filename: lib/DriverFactory.js
// const path = require('path')
const { Builder } = require('selenium-webdriver')
//const config = require('../lib/config.js')

class DriverFactory {
  constructor(config) {
    this.config = config
  }

  async build() {
    //process.env.PATH += path.delimiter + path.join(__dirname, '..', 'vendor')
    this.driver = await new Builder().forBrowser(this.config.browser).build()
  }

  async quit() {
    await this.driver.quit()
  }
}

module.exports = DriverFactory
