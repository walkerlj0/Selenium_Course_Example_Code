// filename: test/spec_helper.js
const DriverFactory = require('../lib/DriverFactory')
const driverFactory = new DriverFactory()

beforeEach(async function() {
  await driverFactory.build()
  this.driver = driverFactory.driver
})

afterEach(async function() {
  await driverFactory.quit()
})
