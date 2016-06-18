using OpenQA.Selenium;

namespace PageObjects 
{
    class DynamicLoadingPage : BasePage
    {
        By StartButton = By.CssSelector("#start > button");
        By FinishText = By.Id("finish");

        public DynamicLoadingPage(IWebDriver Driver) : base(Driver) { }

        public void LoadExample(int ExampleNumber)
        {
            Visit("/dynamic_loading/" + ExampleNumber);
            Click(StartButton);
        }

        public bool FinishTextPresent()
        {
            return IsDisplayed(FinishText, 10);
        }
    }
}
