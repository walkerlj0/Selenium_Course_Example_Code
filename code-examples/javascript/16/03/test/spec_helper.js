const DriverFactory = require("../lib/DriverFactory");
const config = require("../lib/config");
let driverFactory;
let driver;

beforeEach(async function() {
  driverFactory = new DriverFactory(config);
  global.driver = await driverFactory.build();
});

afterEach(async function() {
  const testName = this.currentTest.fullTitle();
  const testResult = this.currentTest.state === "passed";
  await driverFactory.quit(testName, testResult);
});
