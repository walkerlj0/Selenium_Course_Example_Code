module.exports = {
  baseUrl: process.env.BASE_URL || "http://the-internet.herokuapp.com",
  host: process.env.HOST || "localhost",
  browser: process.env.BROWSER || "chrome",
  // Sauce Config
  sauceUsername: process.env.SAUCE_USERNAME,
  sauceAccessKey: process.env.SAUCE_ACCESS_KEY,
  browserVersion: process.env.BROWSER_VERSION || "11.0",
  platform: process.env.PLATFORM || "Windows 7"
};
