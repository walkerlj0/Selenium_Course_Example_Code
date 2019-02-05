const DriverFactory = require("../lib/DriverFactory");
const config = require("../lib/config");
const driverFactory = new DriverFactory(config);
let driver;

beforeEach(async function() {
  const testName = this.currentTest.fullTitle();
  this.driver = await driverFactory.build(testName);
});

afterEach(async function() {
  const testPassed = this.currentTest.state === "passed";
  await driverFactory.quit(testPassed);
});
