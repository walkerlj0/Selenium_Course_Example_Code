// filename: lib/config.js
module.exports = {
baseUrl: process.env.BASE_URL || 'http://the-internet.herokuapp.com',
host: process.env.HOST || 'saucelabs',
sauce: {
  "browserName": process.env.BROWSER_NAME || 'chrome',
  "browserVersion": process.env.BROWSER_VERSION || '75.0',
  "platformName": process.env.PLATFORM_NAME || 'Windows 10',
  "sauce:options": {
    "username": process.env.SAUCE_USERNAME,
    "accessKey": process.env.SAUCE_ACCESS_KEY,
  }
},
  sauceW3C: {
    "browserName": process.env.BROWSER_NAME || 'chrome',
    "browserVersion": process.env.BROWSER_VERSION || "75.0",
    "platformName": process.env.PLATFORM_NAME || "Windows 7",
    "sauce:options": {
      "username": process.env.SAUCE_USERNAME,
      "accessKey": process.env.SAUCE_ACCESS_KEY,
      "tunnelIdentifier": process.env.SAUCE_TUNNEL,
    }
  },
  jenkins: {
    "browserName": process.env.BROWSER_NAME || 'chrome',
    "browserVersion": process.env.BROWSER_VERSION || "75.0",
    "platformName": process.env.PLATFORM_NAME || "Windows 10",
    "sauce:options": {
      "username": process.env.SAUCE_USERNAME,
      "accessKey": process.env.SAUCE_ACCESS_KEY,
      "build": process.env.SAUCE_BUILD_NAME,
    }
  }

}