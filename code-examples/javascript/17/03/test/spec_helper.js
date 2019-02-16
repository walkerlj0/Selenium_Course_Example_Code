const DriverFactory = require("../lib/DriverFactory");
const config = require("../lib/config");
const driverFactory = new DriverFactory(config);
let driver;

beforeEach(async function() {
  const testName = this.currentTest.fullTitle();
  const hasEyesCommands = this.currentTest.body.match(/this.eyes/);
  this.driver = await driverFactory.build(testName, hasEyesCommands);
  this.eyes = driverFactory.eyes;
});

afterEach(async function() {
  const testPassed = this.currentTest.state === "passed";
  await driverFactory.quit(testPassed);
});
