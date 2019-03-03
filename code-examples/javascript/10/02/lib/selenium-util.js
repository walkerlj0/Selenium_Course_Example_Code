function setDriver(driver) {
  this.driver = driver
}

async function visit(url) {
  await this.driver.get(url)
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
  try {
    return await find(locator).isDisplayed()
  } catch (error) {
    return false
  }
}

module.exports = { setDriver, visit, find, click, type, isDisplayed }
