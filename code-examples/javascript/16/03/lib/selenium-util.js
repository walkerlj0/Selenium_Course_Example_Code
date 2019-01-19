const Until = require("selenium-webdriver").until;
const config = require("../lib/config");

async function visit(url) {
  if (url.startsWith("http")) {
    await global.driver.get(url);
  } else {
    await global.driver.get(config.baseUrl + url);
  }
}

function find(locator) {
  return global.driver.findElement(locator);
}

async function click(locator) {
  await find(locator).click();
}

async function type(locator, inputText) {
  await find(locator).sendKeys(inputText);
}

//async function isDisplayed(locator) {
//  try {
//    return await find(locator).isDisplayed()
//  } catch (error) {
//    return false
//  }
//};

async function isDisplayed(locator, timeout) {
  if (timeout) {
    await global.driver.wait(Until.elementLocated(locator), timeout);
    await global.driver.wait(Until.elementIsVisible(find(locator)), timeout);
    return true;
  } else {
    try {
      return await find(locator).isDisplayed();
      console.log("after find.isDisplayed");
    } catch (error) {
      return false;
    }
  }
}

module.exports = { visit, find, click, type, isDisplayed };
