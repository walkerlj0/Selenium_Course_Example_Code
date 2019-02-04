const { set, visit, click, isDisplayed } = require("../lib/selenium-util");

const START_BUTTON = { css: "#start button" };
const FINISH_TEXT = { id: "finish" };

function load(driver) {
  set(driver);
}

async function loadExample(exampleNumber) {
  await visit("/dynamic_loading/" + exampleNumber);
  await click(START_BUTTON);
}

async function isFinishTextPresent() {
  return isDisplayed(FINISH_TEXT, 10000);
}

const DynamicLoadingPage = {
  load,
  loadExample,
  isFinishTextPresent
};

module.exports = DynamicLoadingPage;
