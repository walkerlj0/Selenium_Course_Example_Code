using System.Configuration;
using OpenQA.Selenium;
using NUnit.Framework;
using OpenQA.Selenium.Firefox;

namespace Tests
{
    [TestFixture]
    class BaseTest
    {
        public IWebDriver Driver;
        public static string ApplicationBaseUrl;

        private void LoadConfigValues()
        {
            var configReader    = new AppSettingsReader();
            ApplicationBaseUrl  = (string)configReader.GetValue("ApplicationBaseUrl", typeof(string));
        }

        [SetUp]
        protected void SetUp()
        {
            LoadConfigValues();
            Driver = new FirefoxDriver();
        }

        [TearDown]
        protected void TearDown()
        {
            Driver.Quit();
        }
    }
}