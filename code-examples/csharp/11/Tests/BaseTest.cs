using System;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;

namespace Tests
{
    [TestFixture]
    class BaseTest
    {
        protected IWebDriver Driver;
        public static string BaseUrl;
        private static string VendorDirectory;

        [SetUp]
        protected void SetUp()
        {
            BaseUrl         = System.Environment.GetEnvironmentVariable("BASE_URL") ?? "http://the-internet.herokuapp.com";
            VendorDirectory = System.IO.Directory.GetParent(
                                System.AppContext.BaseDirectory).
                                Parent.Parent.Parent.FullName
                                + @"/vendor";
            var Service = FirefoxDriverService.CreateDefaultService(VendorDirectory);
            Driver = new FirefoxDriver(Service);
        }
        [TearDown]
        protected void TearDown()
        {
            Driver.Quit();
        }
    }
}
