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
        public IWebDriver Driver;
        public static string ApplicationBaseUrl;
        protected static string BrowserName;
        protected static string VendorDirectory;

        private void LoadConfigValues()
        {
            var ConfigReader    = new AppSettingsReader();
            BrowserName         = (string)ConfigReader.GetValue("BrowserName", typeof(string));
            ApplicationBaseUrl  = (string)ConfigReader.GetValue("ApplicationBaseUrl", typeof(string));
            VendorDirectory     = System.IO.Directory.GetParent(
                                  System.IO.Path.GetDirectoryName(
                                  typeof(Tests.BaseTest).Assembly.Location)).
                              	  Parent.FullName + @"\Vendor";
        }

        [SetUp]
        protected void SetUp()
        {
            LoadConfigValues();
            switch (BrowserName.ToLower())
            {
                case "firefox":
                    Driver = new FirefoxDriver();
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