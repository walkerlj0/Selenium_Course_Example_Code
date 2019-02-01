const DriverFactory = require("../lib/DriverFactory");
const config = require("../lib/config");
global.test_timeout = 60000;
let driverFactory;

beforeEach(async function() {
  this.timeout(global.test_timeout);
  driverFactory = new DriverFactory(config);
  global.driver = await driverFactory.build();
});

afterEach(async function() {
  const testName = this.currentTest.fullTitle();
  const testPassed = this.currentTest.state === "passed";
  await driverFactory.quit(testName, testPassed);
});
