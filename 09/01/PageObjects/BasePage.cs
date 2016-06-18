using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace PageObjects
{
    class BasePage
    {
        IWebDriver Driver;

        protected BasePage(IWebDriver Driver)
        {
            this.Driver = Driver;
        }
            
        protected void Visit(string Url)
        {
            Driver.Navigate().GoToUrl(Url);
        }

        protected IWebElement Find(By Locator)
        {
            return Driver.FindElement(Locator);
        }

        protected void Click(By Locator)
        {
            Find(Locator).Click();
        }

        protected void Type(By Locator, string InputText)
        {
            Find(Locator).SendKeys(InputText);
        }

        protected bool IsDisplayed(By Locator)
        {
            return Find(Locator).Displayed;
        }
    }
}
