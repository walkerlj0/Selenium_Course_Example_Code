using System;
using System.Configuration;
using OpenQA.Selenium;
using NUnit.Framework;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using NUnit.Framework.Interfaces;

namespace Tests
{
    [TestFixture]
    class BaseTest
    {
        protected IWebDriver Driver;
        public static string ApplicationBaseUrl;
        private static string VendorDirectory;
        private static string BrowserName;
        private static string Host;
        private static string BrowserVersion;
        private static string Platform;

        private void LoadConfigValues()
        {
            var configReader    = new AppSettingsReader();
            Host                = (string)configReader.GetValue("Host", typeof(string));
            BrowserName         = (string)configReader.GetValue("BrowserName", typeof(string));
            BrowserVersion      = (string)configReader.GetValue("BrowserVersion", typeof(string));
            Platform            = (string)configReader.GetValue("Platform", typeof(string));
            ApplicationBaseUrl  = (string)configReader.GetValue("ApplicationBaseUrl", typeof(string));
            VendorDirectory     = System.IO.Directory.GetParent(
                                    System.IO.Path.GetDirectoryName(
                                    typeof(Tests.BaseTest).Assembly.Location)).
                                    Parent.FullName + @"\Vendor";
        }

        [SetUp]
        protected void SetUp()
        {
            LoadConfigValues();
            switch (Host.ToLower())
            {
                case "localhost":
                    switch (BrowserName.ToLower())
                    {
                        case "firefox":
			    var VendorDirectory = System.IO.Directory.GetParent(
						    System.AppDomain.CurrentDomain.BaseDirectory).
							Parent.Parent.FullName
							    + @"\Vendor";
			    var Service = FirefoxDriverService.CreateDefaultService(VendorDirectory);
			    Driver = new FirefoxDriver(Service);
                            break;
                        case "chrome":
                            Driver = new ChromeDriver(VendorDirectory);
                            break;
                    }
                    break;
                case "saucelabs":
                    DesiredCapabilities caps = new DesiredCapabilities();
                    caps.SetCapability(CapabilityType.BrowserName, BrowserName);
                    caps.SetCapability(CapabilityType.Version, BrowserVersion);
                    caps.SetCapability(CapabilityType.Platform, Platform);
                    caps.SetCapability("username", System.Environment.GetEnvironmentVariable("SAUCE_USERNAME"));
                    caps.SetCapability("accessKey", System.Environment.GetEnvironmentVariable("SAUCE_ACCESS_KEY"));
                    caps.SetCapability("name", TestContext.CurrentContext.Test.Name);
                    Driver = new RemoteWebDriver(new Uri("http://ondemand.saucelabs.com:80/wd/hub"), caps);
                    break;
            }
        }

        [TearDown]
        protected void TearDown()
        {
            if (Host.Equals("saucelabs"))
                {
                    bool testPassed = TestContext.CurrentContext.Result.Outcome.Status.Equals(TestStatus.Passed);
                try
                {
                    ((IJavaScriptExecutor)Driver).ExecuteScript("sauce:job-result=" + (testPassed ? "passed" : "failed"));
                    Console.WriteLine("https://saucelabs.com/beta/tests/" + ((RemoteWebDriver)Driver).SessionId);
                }    
                finally
                {
                    Driver.Quit();
                }
            } else
            {
                Driver.Quit();
            }
        }
    }
}
