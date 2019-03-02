const config = require('./config')

function setDriver(driver) {
  this.driver = driver
}

async function visit(url) {
  if (url.startsWith('http')) {
    await this.driver.get(url)
  } else {
    await this.driver.get(config.baseUrl + url)
  }
}

function find(locator) {
  return this.driver.findElement(locator)
}

async function click(locator) {
  await find(locator).click()
}

async function type(locator, inputText) {
  await find(locator).sendKeys(inputText)
}

async function isDisplayed(locator) {
  return await find(locator).isDisplayed()
}

module.exports = { setDriver, visit, find, click, type, isDisplayed }
