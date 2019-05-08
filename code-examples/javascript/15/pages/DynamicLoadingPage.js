const Page = require('./Page')

const START_BUTTON = { css: '#start button' }
const FINISH_TEXT = { id: 'finish' }

class DynamicLoadingPage extends Page {
  constructor(driver) {
    super(driver)
  }

  async loadExample(exampleNumber) {
    await this.visit('/dynamic_loading/' + exampleNumber)
    await this.click(START_BUTTON)
  }

  async isFinishTextPresent() {
    return this.isDisplayed(FINISH_TEXT, 10000)
  }
}

module.exports = DynamicLoadingPage
