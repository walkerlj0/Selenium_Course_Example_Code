using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using PageObjects;

namespace Tests
{
    [TestFixture]
    class DynamicLoadingTest
    {
        IWebDriver Driver;
        DynamicLoadingPage DynamicLoading;

        [SetUp]
        public void SetUp()
        {
            var VendorDirectory = System.IO.Directory.GetParent(
                                    System.AppDomain.CurrentDomain.BaseDirectory).
                                    Parent.Parent.FullName
                                    + @"\Vendor";
            var Service = FirefoxDriverService.CreateDefaultService(VendorDirectory);
            Driver = new FirefoxDriver(Service);
            DynamicLoading = new DynamicLoadingPage(Driver);
        }

        [TearDown]
        public void TearDown()
        {
            Driver.Quit();
        }

        [Test]
        public void ElementHidden()
        {
            DynamicLoading.LoadExample(1);
            Assert.That(DynamicLoading.FinishTextPresent);
        }
    }
}
