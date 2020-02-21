const DriverFactory = require('../lib/DriverFactory')
const config = require('../lib/config')
const driverFactory = new DriverFactory(config)

beforeEach(async function() {
  const testName = this.currentTest.fullTitle()
  await driverFactory.build(testName)
  this.driver = driverFactory.driver
})

afterEach(async function() {
  await driverFactory.quit()
})
