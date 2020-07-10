using System;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.IE;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Remote;

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
        private static string Host;
        private static string BrowserName;
        private static string BrowserVersion;
        private static string PlatformName;

        [SetUp]
        protected void SetUp()
        {
            BaseUrl         = System.Environment.GetEnvironmentVariable("BASE_URL") ?? "http://the-internet.herokuapp.com";
            Host            = System.Environment.GetEnvironmentVariable("HOST") ?? "saucelabs";
            BrowserName     = System.Environment.GetEnvironmentVariable("BROWSER_NAME") ?? "ie";
            BrowserVersion  = System.Environment.GetEnvironmentVariable("BROWSER_VERSION") ?? "10.0";
            PlatformName    = System.Environment.GetEnvironmentVariable("PLATFORM_NAME") ?? "Windows 8";
            var sauceUsername = System.Environment.GetEnvironmentVariable("SAUCE_USERNAME");
            var sauceAccessKey = System.Environment.GetEnvironmentVariable("SAUCE_ACCESS_KEY");
            var url = new Uri($"http://{sauceUsername}:{sauceAccessKey}@ondemand.saucelabs.com:80/wd/hub");
            switch (Host.ToLower())
            {
                case "localhost":
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
                    break;
                case "saucelabs":
                    switch (BrowserName.ToLower())
                    {
                        case "chrome":
                        {
                            ChromeOptions options = new ChromeOptions();
                            options.PlatformName = PlatformName;
                            options.BrowserVersion = BrowserVersion;
                            Driver = new RemoteWebDriver(url, options.ToCapabilities());
                            break;
                        }
                        case "edge":
                        {
                            EdgeOptions options = new EdgeOptions();
                            options.PlatformName = PlatformName;
                            options.BrowserVersion = BrowserVersion;
                            Driver = new RemoteWebDriver(url, options.ToCapabilities());
                            break;
                        }
                        case "firefox":
                        {
                            FirefoxOptions options = new FirefoxOptions();
                            options.PlatformName = PlatformName;
                            options.BrowserVersion = BrowserVersion;
                            Driver = new RemoteWebDriver(url, options.ToCapabilities());
                            break;
                        }
                        case "ie":
                        {
                            InternetExplorerOptions options = new InternetExplorerOptions();
                            options.PlatformName = PlatformName;
                            options.BrowserVersion = BrowserVersion;
                            Driver = new RemoteWebDriver(url, options.ToCapabilities());
                            break;
                        }
                    }
                    break;
            }
        }
        [TearDown]
        protected void TearDown()
        {
            if (Host.Equals("saucelabs"))
            {
                var testName = TestContext.CurrentContext.Test.Name;
                ((IJavaScriptExecutor)Driver).ExecuteScript("sauce:job-name=" + testName);
            }
            Driver.Quit();
        }
    }
}
