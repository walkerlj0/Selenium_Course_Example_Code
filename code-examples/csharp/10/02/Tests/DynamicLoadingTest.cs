using System;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using PageObjects;

namespace Tests
{
    [TestFixture]
    class DynamicLoadingTest : BaseTest
    {
        protected IWebDriver Driver;
        private static string VendorDirectory;
        DynamicLoadingPage DynamicLoading;

        [SetUp]
        public new void SetUp()
        {
            VendorDirectory = System.IO.Directory.GetParent(
                System.AppContext.BaseDirectory).
                Parent.Parent.Parent.FullName
                + @"/vendor";
            var Service = FirefoxDriverService.CreateDefaultService(VendorDirectory);
            Driver = new FirefoxDriver(Service);
            DynamicLoading = new DynamicLoadingPage(Driver);
        }

        [Test]
        public void ElementHidden()
        {
            DynamicLoading.LoadExample(1);
            Assert.That(DynamicLoading.FinishTextPresent);
        }
    }
}
