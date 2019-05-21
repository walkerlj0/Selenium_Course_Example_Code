module.exports = {
  baseUrl: process.env.BASE_URL || 'http://the-internet.herokuapp.com',
  browser: process.env.BROWSER || 'firefox',
  viewportSize: { width: 1024, height: 768 } || {
    width: process.env.WIDTH,
    height: process.env.HEIGHT,
  },
  host: process.env.HOST || 'localhost',
  sauce: {
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    platform: process.env.PLATFORM || 'Windows 7',
    browserName: process.env.BROWSER || 'internet explorer',
    version: process.env.BROWSER_VERSION || '11.0',
  },
}
