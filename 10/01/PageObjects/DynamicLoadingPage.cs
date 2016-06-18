using OpenQA.Selenium;

namespace PageObjects 
{
    class DynamicLoadingPage : BasePage
    {
        By StartButton = By.CssSelector("#start > button");
        By FinishText = By.Id("finish");

        public DynamicLoadingPage(IWebDriver driver) : base(driver) { }

        public void LoadExample(int exampleNumber)
        {
            Visit("http://the-internet.herokuapp.com/dynamic_loading/" + exampleNumber);
            Click(StartButton);
        }

        public bool FinishTextPresent()
        {
            return IsDisplayed(FinishText, 10);
        }
    }
}
