module.exports = {
  baseUrl: process.env.BASE_URL || 'http://the-internet.herokuapp.com',
  browser: process.env.BROWSER || 'firefox',
  host: process.env.HOST || 'localhost',
  sauce: {
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    browserName: process.env.BROWSER_NAME || 'internet explorer',
    browserVersion: process.env.BROWSER_VERSION || '11.0',
    platformName: process.env.PLATFORM_NAME || 'Windows 7',
  },
}
