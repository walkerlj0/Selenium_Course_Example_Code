const DriverFactory = require('../lib/DriverFactory')
const driverFactory = new DriverFactory()

beforeEach(async function() {
  const testName = this.currentTest.fullTitle()
  const hasEyesCommands = this.currentTest.body.match(/this.eyes/)
  this.driver = await driverFactory.build(testName, hasEyesCommands)
  this.eyes = driverFactory.eyes
})

afterEach(async function() {
  await driverFactory.quit()
})
