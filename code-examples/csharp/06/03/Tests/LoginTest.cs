using System;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;

namespace Tests
{
    [TestFixture]
    class LoginTest
    {
        private static string VendorDirectory = System.IO.Directory.GetParent(
            System.AppContext.BaseDirectory).
            Parent.Parent.Parent.FullName
            + @"/vendor";
        protected IWebDriver Driver;

        [SetUp]
        public void SetUp()
        {
            var Service = FirefoxDriverService.CreateDefaultService(VendorDirectory);
            Driver = new FirefoxDriver(Service);
        }

        [TearDownj
        protected void TearDown()
        {
            Driver.Quit();
        }

        [Test]
        public void ValidAccount()
        {
            Driver.Navigate().GoToUrl("http://the-internet.herokuapp.com/login");
            Driver.FindElement(By.Id("username")).SendKeys("tomsmith");
            Driver.FindElement(By.Id("password")).SendKeys("SuperSecretPassword!");
            Driver.FindElement(By.CssSelector("button")).Click();
            Assert.That(Driver.FindElement(By.CssSelector(".flash.success")).Displayed);
        }
    }
}
