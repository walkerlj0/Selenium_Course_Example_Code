using System;
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
            
        protected void Visit(String Url)
        {
            if (Url.Contains("http"))
            {
                Driver.Navigate().GoToUrl(Url);
            } else
            {
                Driver.Navigate().GoToUrl(Tests.BaseTest.ApplicationBaseUrl + Url);
            }
        }

        protected IWebElement Find(By Locator)
        {
            return Driver.FindElement(Locator);
        }

        protected void Click(By Locator)
        {
            Find(Locator).Click();
        }

        protected void Type(By Locator, String InputText)
        {
            Find(Locator).SendKeys(InputText);
        }

        protected Boolean IsDisplayed(By Locator)
        {
            try {
                return Find(Locator).Displayed;
            } catch(OpenQA.Selenium.NoSuchElementException) {
                return false;
            }
        }

        protected Boolean IsDisplayed(By Locator, int MaxWaitTime)
        {
            try {
                WebDriverWait wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(MaxWaitTime));
                wait.Until(ExpectedConditions.ElementIsVisible(Locator));
                return true;
            } catch(OpenQA.Selenium.NoSuchElementException) {
                return false;
            }
        }

    }
}
