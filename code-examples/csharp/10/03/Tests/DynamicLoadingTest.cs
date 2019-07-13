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
        private static string VendorDirectory = System.IO.Directory.GetParent(
            System.AppContext.BaseDirectory).
            Parent.Parent.Parent.FullName
            + @"/vendor";
        protected IWebDriver Driver;
        DynamicLoadingPage DynamicLoading;

        [SetUp]
        public new void SetUp()
        {
            var Service = FirefoxDriverService.CreateDefaultService(VendorDirectory);
            Driver = new FirefoxDriver(Service);
            DynamicLoading = new DynamicLoadingPage(Driver);
        }

        [TearDownj
        protected void TearDown()
        {
            Driver.Quit();
        }

        [Test]
        public void ElementHidden()
        {
            DynamicLoading.LoadExample(1);
            Assert.That(DynamicLoading.FinishTextPresent);
        }

        [Test]
        public void ElementRendered()
        {
            DynamicLoading.LoadExample(2);
            Assert.That(DynamicLoading.FinishTextPresent);
        }
    }
}
