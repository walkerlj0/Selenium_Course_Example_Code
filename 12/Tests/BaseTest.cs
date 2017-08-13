using System.Configuration;
using OpenQA.Selenium;
using NUnit.Framework;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Chrome;

namespace Tests
{
    [TestFixture]
    class BaseTest
    {
        protected IWebDriver Driver;
        public static string ApplicationBaseUrl;
        private static string BrowserName;
        private static string VendorDirectory;

        private void LoadConfigValues()
        {
            var configReader    = new AppSettingsReader();
            BrowserName         = (string)configReader.GetValue("BrowserName", typeof(string));
            ApplicationBaseUrl  = (string)configReader.GetValue("ApplicationBaseUrl", typeof(string));
            VendorDirectory     = System.IO.Directory.GetParent(
                                    System.AppDomain.CurrentDomain.BaseDirectory).
                                    Parent.Parent.FullName
                                    + @"\Vendor";
        }

        [SetUp]
        protected void SetUp()
        {
            LoadConfigValues();
            switch (BrowserName.ToLower())
            {
                case "firefox":
                    var Service = FirefoxDriverService.CreateDefaultService(VendorDirectory);
                    Driver = new FirefoxDriver(Service);
                    break;
                case "chrome":
                    Driver = new ChromeDriver(VendorDirectory);
                    break;
            }
        }

        [TearDown]
        protected void TearDown()
        {
            Driver.Quit();
        }
    }
}
