using OpenQA.Selenium;
using NUnit.Framework;
using OpenQA.Selenium.Firefox;

namespace Tests
{
    [TestFixture]
    class BaseTest
    {
        public IWebDriver Driver;

        [SetUp]
        protected void SetUp()
        {
            Driver = new FirefoxDriver();
        }

        [TearDown]
        protected void TearDown()
        {
            Driver.Quit();
        }
    }
}