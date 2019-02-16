const assert = require('assert')
require('./spec_helper')
const DynamicLoadingPage = require('../pages/DynamicLoadingPage')

describe('Dynamic Loading @deep', function() {
  let dynamicLoading

  beforeEach(function() {
    dynamicLoading = new DynamicLoadingPage(this.driver)
  })

  it('hidden element', async function() {
    await dynamicLoading.loadExample('1')
    assert(
      await dynamicLoading.isFinishTextPresent(),
      true,
      'Finish text not displayed'
    )
  })

  it('rendered element', async function() {
    await dynamicLoading.loadExample('2')
    assert(
      await dynamicLoading.isFinishTextPresent(),
      true,
      'Finish text not displayed'
    )
  })
})
