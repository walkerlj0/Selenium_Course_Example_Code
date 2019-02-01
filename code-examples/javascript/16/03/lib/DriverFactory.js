const { Builder } = require("selenium-webdriver");

// TODO:
// - Sauce Options
// - Add OS detection or alt. options for Windows vs. POSIX for readers
// - npm install chromedriver and geckodriver?
class DriverFactory {
  constructor(config) {
    this.config = config;
  }

  _configure() {
    let builder;
    switch (this.config.host) {
      case "saucelabs":
        const url = "http://ondemand.saucelabs.com:80/wd/hub";
        builder = new Builder().usingServer(url);
        builder.withCapabilities({
          browserName: this.config.browser,
          browserVersion: this.config.browserVersion,
          platform: this.config.platform,
          username: this.config.sauceUsername,
          accessKey: this.config.sauceAccessKey
        });
        break;
      case "localhost":
        var vendorDirectory = process.cwd() + "/vendor";
        process.env.PATH = vendorDirectory + ":$PATH";
        builder = new Builder().forBrowser(this.config.browser);
        break;
    }
    return builder;
  }

  async build() {
    this.driver = await this._configure().build();
    this.sessionId = await this.driver.getSession().id_;
    return this.driver;
  }

  async quit(testName, testPassed) {
    if (this.config.host === "saucelabs") {
      this.driver.executeScript("sauce:job-name=" + testName);
      this.driver.executeScript("sauce:job-result=" + testPassed);
    }
    await this.driver.quit();
    if (this.config.host === "saucelabs" && !testPassed)
      throw new Error("https://saucelabs.com/beta/tests/" + this.sessionId);
  }
}

module.exports = DriverFactory;
