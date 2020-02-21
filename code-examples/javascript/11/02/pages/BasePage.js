const Until = require('selenium-webdriver').until
const config = require('../lib/config')

class BasePage {
  constructor(driver) {
    this.driver = driver
  }

  async visit(url) {
    if (url.startsWith('http')) {
      await this.driver.get(url)
    } else {
      await this.driver.get(config.baseUrl + url)
    }
  }

  find(locator) {
    return this.driver.findElement(locator)
  }

  async click(locator) {
    await this.find(locator).click()
  }

  async type(locator, inputText) {
    await this.find(locator).sendKeys(inputText)
  }

  async isDisplayed(locator, timeout) {
    if (timeout) {
      await this.driver.wait(Until.elementLocated(locator), timeout)
      await this.driver.wait(
        Until.elementIsVisible(this.find(locator)),
        timeout
      )
      return true
    } else {
      try {
        return await this.find(locator).isDisplayed()
      } catch (error) {
        return false
      }
    }
  }
}

module.exports = BasePage
