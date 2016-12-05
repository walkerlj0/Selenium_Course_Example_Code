using OpenQA.Selenium;
using NUnit.Framework;
using OpenQA.Selenium.Firefox;

namespace Tests
{
    [TestFixture]
    class BaseTest
    {
        protected IWebDriver Driver;

        [SetUp]
        protected void SetUp()
        {
            var VendorDirectory = System.IO.Directory.GetParent(
                                    System.AppDomain.CurrentDomain.BaseDirectory).
                                        Parent.Parent.FullName
                                            + @"\Vendor";
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
