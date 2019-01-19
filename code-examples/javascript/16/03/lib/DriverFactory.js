const { Builder } = require("selenium-webdriver");

class DriverFactory {
  constructor(config) {
    this.config = config;
  }

  configure() {
    let builder;
    if (this.config.host === "saucelabs") {
      const url = "http://ondemand.saucelabs.com:80/wd/hub";
      builder = new Builder().usingServer(url);
      // TODO: Sauce Options
      builder.withCapabilities({
        browserName: this.config.browser,
        browserVersion: this.config.browserVersion,
        platform: this.config.platform,
        username: this.config.sauceUsername,
        accessKey: this.config.sauceAccessKey
      });
    } else if (this.config.host === "localhost") {
      const vendorDirectory = process.cwd() + "/vendor";
      process.env.PATH = vendorDirectory + ":$PATH"; // TODO: Add OS detection or alt. options for Windows vs. POSIX for readers
      builder = new Builder().forBrowser(this.config.browser);
    }
    return builder;
  }

  async build() {
    this.driver = await this.configure().build();
    this.sessionId = await this.driver.getSession().id_;
    return this.driver;
  }

  async quit(testName, testResult) {
    if (this.config.host === "saucelabs") {
      this.driver.executeScript("sauce:job-name=" + testName);
      this.driver.executeScript("sauce:job-result=" + testResult);
    }
    await this.driver.quit();
    if (this.config.host === "saucelabs" && testResult === false) {
      throw new Error("https://saucelabs.com/beta/tests/" + this.sessionId);
    }
  }
}

module.exports = DriverFactory;
