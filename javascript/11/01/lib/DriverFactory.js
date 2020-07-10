const path = require('path')
const { Builder } = require('selenium-webdriver')

class DriverFactory {
  async build() {
    process.env.PATH += path.delimiter + path.join(__dirname, '..', 'vendor')
    this.driver = await new Builder().forBrowser('firefox').build()
  }

  async quit() {
    await this.driver.quit()
  }
}

module.exports = DriverFactory
