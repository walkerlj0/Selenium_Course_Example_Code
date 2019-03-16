const Page = require('./Page')

const START_BUTTON = { css: '#start button' }
const FINISH_TEXT = { id: 'finish' }

class DynamicLoadingPage extends Page {
  constructor(driver) {
    super(driver)
  }

  async loadExample(exampleNumber) {
    await visit(
      'http://the-internet.herokuapp.com/dynamic_loading/' + exampleNumber
    )
    await click(START_BUTTON)
  }

  async isFinishTextPresent() {
    return isDisplayed(FINISH_TEXT, 10000)
  }
}

module.exports = DynamicLoadingPage
