const DriverFactory = require("../lib/DriverFactory");
const config = require("../lib/config");
const driverFactory = new DriverFactory(config);
let driver;

beforeEach(async function() {
  this.driver = await driverFactory.build();
});

afterEach(async function() {
  const testName = this.currentTest.fullTitle();
  const testPassed = this.currentTest.state === "passed";
  await driverFactory.quit(testName, testPassed);
});
