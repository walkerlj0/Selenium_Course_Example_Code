var driver;

beforeEach(function() {
  this.driver = DriverFactory.build();
});

afterEach(function() {
  var testName = this.currentTest.fullTitle();
  var testResult = (this.currentTest.state === 'passed') ? true : false;
  DriverFactory.quit(testName, testResult);
});

module.exports.driver = driver;
