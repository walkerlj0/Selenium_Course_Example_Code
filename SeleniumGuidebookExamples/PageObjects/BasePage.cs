using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace PageObjects
{
    public class BasePage
    {
        IWebDriver Driver;

        public BasePage(IWebDriver Driver)
        {
            this.Driver = Driver;
        }
            
        public void Visit(String Url)
        {
            Driver.Navigate().GoToUrl(Url);
        }

        public IWebElement Find(By Locator)
        {
            return Driver.FindElement(Locator);
        }

        public void Click(By Locator)
        {
            Find(Locator).Click();
        }

        public void Type(By Locator, String InputText)
        {
            Find(Locator).SendKeys(InputText);
        }

        public Boolean IsDisplayed(By Locator)
        {
            try {
                return Find(Locator).Displayed;
            } catch(OpenQA.Selenium.NoSuchElementException) {
                return false;
            }
        }

        public Boolean IsDisplayed(By Locator, int MaxWaitTime)
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
