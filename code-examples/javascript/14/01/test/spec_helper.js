const DriverFactory = require('../lib/DriverFactory')
const config = require('../lib/config')
const driverFactory = new DriverFactory(config)

beforeEach(async function() {
  const testName = this.currentTest.fullTitle()
  const hasEyesCommands = this.currentTest.body.match(/this.eyes/)
  this.driver = await driverFactory.build(testNam, ehasEyesCommands)
  this.eyes = driverFactory.eyes
})

afterEach(async function() {
  await driverFactory.quit()
})
