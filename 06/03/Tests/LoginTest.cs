using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;

namespace Tests
{
    [TestFixture]
    class LoginTest
    {
        IWebDriver Driver;

        [SetUp]
        public void SetUp()
        {
            Driver = new FirefoxDriver();
        }

        [TearDown]
        public void TearDown()
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
            //Assert.That(Driver.FindElement(By.CssSelector(".flash.successasdf")).Displayed);
        }
    }
}
