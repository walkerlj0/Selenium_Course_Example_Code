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
            Driver = new FirefoxDriver();
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

        [Test]
        public void ElementRendered()
        {
            DynamicLoading.LoadExample(2);
            Assert.That(DynamicLoading.FinishTextPresent);
        }
    }
}
