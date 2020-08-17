// filename: test/DynamicLoadingTest.js
require('./spec_helper')
//const path = require('path')
const assert = require('assert')
const DynamicLoadingPage = require('../pages/DynamicLoadingPage')
const DriverFactory = require('../lib/DriverFactory')

describe('Dynamic Loading @deep', function() {
  let dynamicLoading
  beforeEach(async function() {
    //const vendorDirectory =
      // path.delimiter + path.join(__dirname, '..', 'vendor')
      // process.env.PATH += vendorDirectory
      dynamicLoading = new DynamicLoadingPage(this.driver)
  })

  it('hidden element', async function() {
    await dynamicLoading.loadExample('1')
    assert(
      await dynamicLoading.isFinishTextPresent(), true, 'Finish text not displayed'
    )

  })
  it('rendered element', async function() {
    await dynamicLoading.loadExample('2')
    assert(
      await dynamicLoading.isFinishTextPresent(), true, 'Finish text not displayed'
    )
  })

})