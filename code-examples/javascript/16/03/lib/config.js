module.exports = {
  baseUrl: process.env.BASE_URL || "http://the-internet.herokuapp.com",
  host: process.env.HOST || "localhost",
  browser: process.env.BROWSER || "chrome",
  sauce: {
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    platform: process.env.PLATFORM || "Windows 7",
    browserName: process.env.BROWSER || "chrome",
    version: process.env.BROWSER_VERSION || "71.0"
  },
  applitools: {
    accessKey: process.env.APPLITOOLS_API_KEY,
    appName: process.env.APP_NAME || "the-internet",
    viewportSize: process.env.VIEWPORT_SIZE || { width: 600, height: 800 }
  }
};
