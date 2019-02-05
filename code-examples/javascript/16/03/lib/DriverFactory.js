const path = require("path");
const { Builder } = require("selenium-webdriver");
const { Eyes } = require("eyes.selenium");

// TODO:
// - Sauce Options
// - Applitools integration
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
        builder.withCapabilities(this.config.sauce);
        break;
      case "localhost":
        process.env.PATH +=
          path.delimiter + path.join(__dirname, "..", "vendor");
        builder = new Builder().forBrowser(this.config.browser);
        break;
    }
    return builder;
  }

  async build(testName) {
    this.testName = testName;
    this.driver = await this._configure().build();
    this.sessionId = await this.driver.getSession().id_;
    return this.driver;
  }

  async quit(testPassed) {
    if (this.config.host === "saucelabs") {
      this.driver.executeScript("sauce:job-name=" + this.testName);
      this.driver.executeScript("sauce:job-result=" + testPassed);
    }
    await this.driver.quit();
    if (this.config.host === "saucelabs" && !testPassed)
      throw new Error("https://saucelabs.com/beta/tests/" + this.sessionId);
  }
}

module.exports = DriverFactory;
