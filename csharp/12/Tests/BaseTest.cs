using System;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Chrome;

namespace Tests
{
    [TestFixture]
    class BaseTest
    {
        private static string VendorDirectory = System.IO.Directory.GetParent(
            System.AppContext.BaseDirectory).
            Parent.Parent.Parent.FullName
            + @"/vendor";
        protected IWebDriver Driver;
        public static string BaseUrl;
        private static string BrowserName;

        [SetUp]
        protected void SetUp()
        {
            BaseUrl       = System.Environment.GetEnvironmentVariable("BASE_URL") ?? "http://the-internet.herokuapp.com";
            BrowserName   = System.Environment.GetEnvironmentVariable("BROWSER_NAME") ?? "firefox";
            switch (BrowserName.ToLower())
            {
                case "firefox":
                {
                    var Service = FirefoxDriverService.CreateDefaultService(VendorDirectory);
                    Driver = new FirefoxDriver(Service);
                    break;
                }
                case "chrome":
                {
                    var Service = ChromeDriverService.CreateDefaultService(VendorDirectory);
                    Driver = new ChromeDriver(Service);
                    break;
                }
            }
        }

        [TearDown]
        protected void TearDown()
        {
            Driver.Quit();
        }
    }
}
